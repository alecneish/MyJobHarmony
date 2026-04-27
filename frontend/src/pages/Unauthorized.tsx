import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="jh-auth-container">
      <div className="jh-auth-card jh-auth-card--center">
        <h2>Access Denied</h2>
        <p className="jh-muted-copy jh-mb-lg">
          You don&rsquo;t have permission to view this page.
        </p>
        <div className="jh-inline-actions">
          <Link to="/candidate/dashboard" className="jh-btn-primary">
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
