import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is not set');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_PUBLISHABLE_KEY is not set');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    detectSessionInUrl: true,
    // Bypass navigator.locks which can hang indefinitely due to orphaned
    // locks from React Strict Mode, fast page transitions, or component
    // remounts.  This was causing the entire app to freeze on "Loading…"
    // because getSession() / signInWithPassword() would never resolve.
    // See: https://github.com/supabase/auth-js/issues/888
    lock: async (_name: string, _acquireTimeout: number, fn: () => Promise<unknown>) => {
      return await fn();
    },
  },
});
