import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { UserProfile } from '../types';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ role: string }>;
  signUp: (email: string, password: string, username: string, role: 'recruiter' | 'job_seeker') => Promise<void>;
  signOut: () => Promise<void>;
  isJobSeeker: boolean;
  isRecruiter: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Use onAuthStateChange as the **single** source of truth for auth
    // state. Supabase JS v2.39+ fires an INITIAL_SESSION event on setup,
    // which replaces the need for a separate getSession() call.
    //
    // Why not getSession()?  On some browsers (and in React Strict Mode)
    // it can hang indefinitely due to navigator.locks contention, leaving
    // the app stuck on "Loading…" forever. The auth listener avoids this.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, newSession: Session | null) => {
        if (cancelled) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          await fetchUserProfile(newSession.user);
        } else {
          setUserProfile(null);
        }
        if (!cancelled) setLoading(false);
      },
    );

    // Safety net: if the auth listener hasn't resolved within 5 seconds
    // (e.g. due to orphaned locks or network issues), stop the loading
    // spinner so the app remains usable rather than hanging forever.
    const safetyTimeout = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 5000);

    return () => {
      cancelled = true;
      clearTimeout(safetyTimeout);
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function fetchUserProfile(authUser: User) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        if (data.role === 'candidate') data.role = 'job_seeker';
        setUserProfile(data);
        return;
      }
    } catch (err) {
      console.error('Error fetching user profile, falling back to auth metadata:', err);
    }

    const meta = authUser.user_metadata;
    if (meta) {
      let role = (meta.role as string) || 'job_seeker';
      if (role === 'candidate') role = 'job_seeker';
      setUserProfile({
        id: authUser.id,
        username: (meta.username as string) || '',
        role: role as UserProfile['role'],
        created_at: authUser.created_at,
        updated_at: authUser.created_at,
      } as UserProfile);
    }
  }

  async function signIn(email: string, password: string): Promise<{ role: string }> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Set session + user immediately so route guards see consistent state.
    // The onAuthStateChange listener will also fire, but we can't await it,
    // and there's a race where it sets user before userProfile is ready.
    const authUser = data.user;
    setSession(data.session);
    setUser(authUser);

    let role = 'job_seeker';
    if (authUser) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (profile) {
        if (profile.role === 'candidate') profile.role = 'job_seeker';
        setUserProfile(profile);
        role = profile.role;
      } else {
        role = (authUser.user_metadata?.role as string) || 'job_seeker';
        if (role === 'candidate') role = 'job_seeker';
      }
    }

    return { role };
  }

  async function signUp(email: string, password: string, username: string, role: 'recruiter' | 'job_seeker') {
    // The on_auth_user_created trigger automatically creates the user_profiles
    // row from raw_user_meta_data, so we only need to call signUp here.
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          username,
          role
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });
    
    if (error) throw error;
  }

  async function signOut() {
    setSession(null);
    setUser(null);
    setUserProfile(null);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Sign-out API error (local session already cleared):', err);
    }
  }

  const isJobSeeker = userProfile?.role === 'job_seeker';
  const isRecruiter = userProfile?.role === 'recruiter';
  const isAdmin = userProfile?.role === 'admin';

  const value: AuthContextValue = {
    session,
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    isJobSeeker,
    isRecruiter,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
