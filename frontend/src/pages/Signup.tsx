import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showSnackbar } from '../components/Snackbar';
import { Link } from 'react-router-dom';

export default function Signup() {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await signUp(email, password, username, role);
      showSnackbar('Account created — check email if confirmations are enabled');
      // Reset form
      setEmail('');
      setPassword('');
      setUsername('');
      setRole('candidate');
    } catch (err: any) {
      showSnackbar(err?.message ?? 'Sign up failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="jh-auth">
      <div className="jh-section-header" style={{ marginBottom: '1.5rem' }}>
        <h2>Create Account</h2>
        <p>Join JobHarmony and find your perfect career match.</p>
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
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
            />
          </label>
          <label className="jh-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="At least 6 characters"
              minLength={6}
            />
          </label>
          <label className="jh-label">
            I am a...
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'recruiter' | 'candidate')}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="candidate">Candidate (Looking for jobs)</option>
              <option value="recruiter">Recruiter (Hiring talent)</option>
            </select>
          </label>
          <button className="jh-btn-primary" type="submit" disabled={submitting || loading}>
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Already have an account?{' '}
            <Link to="/login" className="jh-link">
              Sign in
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
