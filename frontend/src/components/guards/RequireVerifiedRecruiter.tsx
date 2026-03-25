import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Route-level guard for recruiter actions that require verification
 * (e.g. posting jobs, accessing analytics). Shows a prompt if the
 * recruiter's account is not yet verified. Must be nested inside
 * RequireAuth + RequireRole(['recruiter']).
 */
export default function RequireVerifiedRecruiter() {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <p>Loading&hellip;</p>
      </div>
    );
  }

  if (!userProfile || userProfile.role !== 'recruiter') {
    return <Navigate to="/unauthorized" replace />;
  }

  if (userProfile.verification_status !== 'verified') {
    return (
      <div className="jh-auth-container">
        <div className="jh-auth-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>&#x1F512;</div>
          <h2>Verification Required</h2>
          <p style={{ color: 'var(--jh-gray-600)', marginBottom: '1rem' }}>
            {userProfile.verification_status === 'pending'
              ? 'Your recruiter account is being reviewed. You\u2019ll be notified once approved.'
              : userProfile.verification_status === 'rejected'
                ? 'Your verification request was not approved. Please contact support.'
                : 'Your recruiter account needs verification before you can access this feature.'}
          </p>
          <a href="/recruiter/dashboard" className="jh-btn-primary">
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
