import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Unauthorized() {
  const { userProfile } = useAuth();

  const dashboardPath =
    userProfile?.role === 'recruiter' ? '/recruiter/dashboard' : '/candidate/dashboard';

  return (
    <div className="jh-auth-container">
      <div className="jh-auth-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>&#x1F6AB;</div>
        <h2>Access Denied</h2>
        <p style={{ color: 'var(--jh-gray-600)', marginBottom: '2rem' }}>
          You don&rsquo;t have permission to view this page.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to={dashboardPath} className="jh-btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/" className="jh-btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
