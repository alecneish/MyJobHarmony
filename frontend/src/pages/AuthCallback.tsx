import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

/**
 * Handles the redirect after a user clicks the email confirmation link.
 * Supabase appends token fragments to the URL; this page exchanges them
 * for a session, then redirects to the appropriate dashboard.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      // supabase-js automatically picks up the token from the URL hash/query
      const { data, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      if (!data.session) {
        setError('No session found. The confirmation link may have expired.');
        return;
      }

      // Determine role for navigation
      const user = data.session.user;
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      let role = profile?.role ?? user.user_metadata?.role ?? 'job_seeker';
      // Normalize legacy 'candidate' role to 'job_seeker'
      if (role === 'candidate') role = 'job_seeker';

      if (role === 'recruiter') {
        navigate('/recruiter/dashboard', { replace: true });
      } else {
        navigate('/candidate/dashboard', { replace: true });
      }
    }

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="jh-auth-container">
        <div className="jh-auth-card">
          <h2>Confirmation failed</h2>
          <p>{error}</p>
          <a href="/login" className="jh-btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <p>Confirming your account&hellip;</p>
    </div>
  );
}
