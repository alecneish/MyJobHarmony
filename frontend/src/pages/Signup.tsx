import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  // Redirect already-authenticated users to their dashboard
  if (auth.user && !auth.loading) {
    return <Navigate to="/candidate/dashboard" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await auth.signUp(email, password, username.trim());
      // Supabase may require email confirmation before a session is created.
      // Show a confirmation message instead of navigating to a protected route.
      setConfirmationSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmationSent) {
    return (
      <div className="jh-auth-container">
        <div className="jh-auth-card jh-auth-card--center">
          <h2>Check your email</h2>
          <p className="jh-muted-copy jh-mb-md">
            We sent a confirmation link to <strong>{email}</strong>.
            Click the link in your inbox to activate your account, then log in.
          </p>
          <Link to="/login" className="jh-btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="jh-auth-container">
      <div className="jh-auth-card">
        <div className="jh-section-header jh-section-header--compact">
          <h2>Create an account</h2>
          <p>Enter your details to create your candidate account.</p>
        </div>

        {error && (
          <div className="jh-auth-error" role="alert">
            {error}
          </div>
        )}

        <form className="jh-auth-form" onSubmit={handleSubmit}>
          <label className="jh-field">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>

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
              autoComplete="new-password"
              required
            />
            <small>Minimum 6 characters.</small>
          </label>

          <div className="jh-auth-actions">
            <button className="jh-btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Creating…' : 'Sign up'}
            </button>
            <Link to="/login" className="jh-btn-outline">
              I already have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
