import { supabase } from './supabaseClient';

/**
 * Thin wrapper around fetch that injects the Supabase access token
 * as a Bearer header when the user is logged in.  Falls back to a
 * plain fetch when no session exists (public endpoints).
 *
 * Auth-failure handling:
 *  - 401: returned to the caller as-is. Session expiry is handled by
 *    Supabase's own token-refresh mechanism (onAuthStateChange SIGNED_OUT),
 *    not by individual API responses — auto-signout here caused the user
 *    to be kicked to /login every time any backend route returned 401.
 *  - 403 with DEACTIVATED code -> signs out (account disabled server-side)
 */
export async function apiClient(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  let session = null;
  try {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000));
    const result = await Promise.race([
      supabase.auth.getSession().then(({ data }) => data.session),
      timeout,
    ]);
    session = result;
  } catch {
    // If getSession fails, proceed without auth
  }

  const headers: Record<string, string> = {};

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(path, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string>),
    },
  });

  if (response.status === 403) {
    const body = await response.clone().json().catch(() => null);
    if (body?.error === 'Account is deactivated') {
      await supabase.auth.signOut();
      window.location.href = '/login';
    }
  }

  return response;
}
