import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

/**
 * Handles the redirect after a user clicks the email confirmation link.
 * Supabase appends token fragments to the URL; this page exchanges them
 * for a session, then redirects to the candidate dashboard.
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

      navigate('/candidate/dashboard', { replace: true });
    }

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="jh-auth-container">
        <div className="jh-auth-card">
          <h2>Confirmation failed</h2>
          <p>{error}</p>
          <a href="/login" className="jh-btn-primary jh-btn-inline-spaced">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="jh-page-loading">
      <p>Confirming your account&hellip;</p>
    </div>
  );
}
