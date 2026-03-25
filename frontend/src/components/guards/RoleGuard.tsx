import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  roles: Array<'job_seeker' | 'recruiter' | 'admin'>;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Presentation-level guard for conditional rendering.
 * Renders children only if the current user's role is in the allowed list.
 *
 * Usage:
 *   <RoleGuard roles={['recruiter']}>
 *     <button>Post a Job</button>
 *   </RoleGuard>
 */
export default function RoleGuard({ roles, children, fallback = null }: Props) {
  const { userProfile } = useAuth();

  if (!userProfile || !roles.includes(userProfile.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
