import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showSnackbar } from '../components/Snackbar';
import { Link } from 'react-router-dom';

export default function Login() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await signIn(email, password);
      showSnackbar('Signed in successfully');
    } catch (err: any) {
      showSnackbar(err?.message ?? 'Sign in failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="jh-auth">
      <div className="jh-section-header" style={{ marginBottom: '1.5rem' }}>
        <h2>Sign In</h2>
        <p>Welcome back! Sign in to your JobHarmony account.</p>
      </div>

      <div className="jh-card" style={{ padding: '1.5rem', maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="jh-form" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label className="jh-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="jh-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              minLength={6}
            />
          </label>
          <button className="jh-btn-primary" type="submit" disabled={submitting || loading}>
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="jh-link">
              Sign up
            </Link>
          </p>
          <Link to="/" className="jh-link" style={{ fontSize: '0.9rem' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
