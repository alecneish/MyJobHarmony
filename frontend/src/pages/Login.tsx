import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect already-authenticated users to their dashboard
  if (auth.user && !auth.loading) {
    return <Navigate to="/candidate/dashboard" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await auth.signIn(email, password);
      navigate('/candidate/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="jh-auth-container">
      <div className="jh-auth-card">
        <div className="jh-section-header jh-section-header--compact">
          <h2>Log in</h2>
          <p>Welcome back. Enter your email and password to continue.</p>
        </div>

        {error && (
          <div className="jh-auth-error" role="alert">
            {error}
          </div>
        )}

        <form className="jh-auth-form" onSubmit={handleSubmit}>
          <label className="jh-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="jh-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <small>For this demo, accounts are stored in Supabase.</small>
          </label>

          <div className="jh-auth-actions">
            <button className="jh-btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Logging in…' : 'Log in'}
            </button>
            <Link to="/signup" className="jh-btn-outline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
