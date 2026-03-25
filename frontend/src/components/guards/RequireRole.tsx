import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  roles: Array<'job_seeker' | 'recruiter' | 'admin'>;
}

/**
 * Route-level guard that restricts access to the listed roles.
 * Must be nested inside RequireAuth so userProfile is guaranteed.
 */
export default function RequireRole({ roles }: Props) {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <p>Loading&hellip;</p>
      </div>
    );
  }

  if (!userProfile || !roles.includes(userProfile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
