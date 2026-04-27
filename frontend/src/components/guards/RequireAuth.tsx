import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Route-level guard that redirects unauthenticated visitors to /login,
 * preserving the intended destination in location state.
 * Use as a layout route wrapping protected children.
 */
export default function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="jh-loading-state">
        <p>Loading&hellip;</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
