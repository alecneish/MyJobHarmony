import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showSnackbar } from '../components/Snackbar';

export default function Auth() {
  const { user, userProfile, loading, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        showSnackbar('Signed in');
      } else {
        await signUp(email, password, username, role);
        showSnackbar('Account created — check email if confirmations are enabled');
      }
      setEmail('');
      setPassword('');
      setUsername('');
      setRole('candidate');
    } catch (err: any) {
      showSnackbar(err?.message ?? 'Auth error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      showSnackbar('Signed out');
    } catch (err: any) {
      showSnackbar(err?.message ?? 'Sign-out failed');
    }
  }

  return (
    <div className="jh-auth">
      <div className="jh-section-header" style={{ marginBottom: '1.5rem' }}>
        <h2>{user ? 'Your account' : 'Sign in or create an account'}</h2>
        <p>Uses Supabase Auth. Local dev uses the Supabase Docker stack from `supabase start`.</p>
      </div>

      {user ? (
        <div className="jh-card" style={{ padding: '1.5rem' }}>
          <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {user.email}</p>
          <p style={{ marginBottom: '0.5rem' }}><strong>User ID:</strong> {user.id}</p>
          {userProfile && (
            <>
              <p style={{ marginBottom: '0.5rem' }}><strong>Username:</strong> {userProfile.username}</p>
              <p style={{ marginBottom: '1.5rem' }}><strong>Role:</strong> {userProfile.role}</p>
            </>
          )}
          <button className="jh-btn-primary" onClick={handleSignOut} disabled={loading}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="jh-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <button
              className={`jh-btn-secondary${mode === 'signin' ? ' active' : ''}`}
              onClick={() => setMode('signin')}
              type="button"
            >
              Sign in
            </button>
            <button
              className={`jh-btn-secondary${mode === 'signup' ? ' active' : ''}`}
              onClick={() => setMode('signup')}
              type="button"
            >
              Create account
            </button>
          </div>

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
                placeholder="At least 6 characters"
                minLength={6}
              />
            </label>
            {mode === 'signup' && (
              <>
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
                  Role
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'recruiter' | 'candidate')}
                    required
                  >
                    <option value="candidate">Candidate</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </label>
              </>
            )}
            <button className="jh-btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
