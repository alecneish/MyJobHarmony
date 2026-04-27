import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface Props {
  roles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Presentation-level guard for conditional rendering.
 * Renders children only if the current user's role is in the allowed list.
 *
 * Usage:
 *   <RoleGuard roles={['job_seeker']}>
 *     <button>Save Job</button>
 *   </RoleGuard>
 */
export default function RoleGuard({ roles, children, fallback = null }: Props) {
  const { userProfile } = useAuth();

  if (!userProfile || !roles.includes(userProfile.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
