import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const auth = useAuth();

  const [role, setRole] = useState<'recruiter' | 'job_seeker'>('job_seeker');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  // Redirect already-authenticated users to their dashboard
  if (auth.user && !auth.loading) {
    const dest = auth.isRecruiter ? '/recruiter/dashboard' : '/candidate/dashboard';
    return <Navigate to={dest} replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await auth.signUp(email, password, username.trim(), role);
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
        <div className="jh-auth-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>&#x2709;&#xFE0F;</div>
          <h2>Check your email</h2>
          <p style={{ color: 'var(--jh-gray-600)', marginBottom: '1.5rem' }}>
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
        <div className="jh-section-header" style={{ marginBottom: '1.25rem' }}>
          <h2>Create an account</h2>
          <p>Enter your details, then choose whether you're a candidate or a recruiter.</p>
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

          <div className="jh-field">
            <span>Role</span>
            <div className="jh-role-grid">
              <label
                className={
                  'jh-role-card' + (role === 'job_seeker' ? ' selected' : '')
                }
              >
                <input
                  type="radio"
                  name="role"
                  value="job_seeker"
                  checked={role === 'job_seeker'}
                  onChange={() => setRole('job_seeker')}
                />
                <div className="jh-role-title">Candidate</div>
                <div className="jh-role-body">
                  I'm looking for roles that fit my personality and work style.
                </div>
              </label>

              <label
                className={
                  'jh-role-card' + (role === 'recruiter' ? ' selected' : '')
                }
              >
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === 'recruiter'}
                  onChange={() => setRole('recruiter')}
                />
                <div className="jh-role-title">Recruiter</div>
                <div className="jh-role-body">
                  I'm hiring and want to see candidates that match my team.
                </div>
              </label>
            </div>
          </div>

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
