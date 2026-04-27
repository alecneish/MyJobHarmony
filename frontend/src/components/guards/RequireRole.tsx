import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface Props {
  roles: UserRole[];
}

/**
 * Route-level guard that restricts access to the listed roles.
 * Must be nested inside RequireAuth so userProfile is guaranteed.
 */
export default function RequireRole({ roles }: Props) {
  const { user, userProfile, loading } = useAuth();

  // Still loading auth state, or user is authenticated but profile
  // hasn't arrived yet (race condition right after sign-in).
  if (loading || (user && !userProfile)) {
    return (
      <div className="jh-loading-state">
        <p>Loading&hellip;</p>
      </div>
    );
  }

  if (!userProfile || !roles.includes(userProfile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
