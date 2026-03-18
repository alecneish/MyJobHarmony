import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await auth.signUp(email, password, '', role); // username can be empty for now
      // Navigate based on role after successful signup
      if (role === 'recruiter') {
        navigate('/recruit');
      } else {
        navigate('/jobs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setSubmitting(false);
    }
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
                  'jh-role-card' + (role === 'candidate' ? ' selected' : '')
                }
              >
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={role === 'candidate'}
                  onChange={() => setRole('candidate')}
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
