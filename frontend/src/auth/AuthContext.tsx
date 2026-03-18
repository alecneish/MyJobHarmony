import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthUser, UserRole } from './types';
import * as localAuth from './localAuth';

type AuthState = {
  user: AuthUser | null;
  signUp: (email: string, password: string, role: UserRole) => Promise<AuthUser>;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const refresh = () => setUser(localAuth.getCurrentUser());

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'jh-auth-session-user-id' || e.key === 'jh-auth-users') refresh();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      signUp: async (email, password, role) => {
        const u = await localAuth.signUp(email, password, role);
        setUser(u);
        return u;
      },
      signIn: async (email, password) => {
        const u = await localAuth.signIn(email, password);
        setUser(u);
        return u;
      },
      signOut: () => {
        localAuth.signOut();
        setUser(null);
      },
      refresh,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

