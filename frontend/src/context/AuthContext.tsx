import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { UserProfile } from '../types';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
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

    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user);
      }
      if (!cancelled) setLoading(false);
    }

    init();

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
      },
    );

    return () => {
      cancelled = true;
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function fetchUserProfile(authUser: User) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) throw error;
      if (data.role === 'candidate') data.role = 'job_seeker';
      setUserProfile(data);
    } catch (err) {
      console.error('Error fetching user profile, falling back to auth metadata:', err);
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
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(email: string, password: string, username: string, role: 'recruiter' | 'job_seeker') {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          username,
          role
        }
      }
    });
    
    if (authError) throw authError;
    
    // Then create the user profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          username,
          role
        });
      
      if (profileError) throw profileError;
    }
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
