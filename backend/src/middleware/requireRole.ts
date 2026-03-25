import { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest, UserProfile } from './authenticate';

/**
 * Returns middleware that restricts access to the listed roles.
 * Must be placed after `authenticate` in the middleware chain.
 */
export function requireRole(...roles: UserProfile['role'][]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { userProfile } = req as AuthenticatedRequest;
    if (!userProfile) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    if (!roles.includes(userProfile.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    next();
  };
}

/**
 * Blocks requests from deactivated or soft-deleted accounts.
 * Must be placed after `authenticate`.
 */
export function requireActive(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { userProfile } = req as AuthenticatedRequest;
  if (!userProfile) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  if (!userProfile.is_active) {
    res.status(403).json({ error: 'Account is deactivated' });
    return;
  }
  next();
}

/**
 * Requires both recruiter role AND verified verification_status.
 * Use for sensitive actions like posting jobs or viewing analytics.
 */
export function requireVerifiedRecruiter(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { userProfile } = req as AuthenticatedRequest;
  if (!userProfile) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  if (userProfile.role !== 'recruiter') {
    res.status(403).json({ error: 'Recruiter access required' });
    return;
  }
  if (userProfile.verification_status !== 'verified') {
    res.status(403).json({
      error: 'Recruiter verification required',
      code: 'UNVERIFIED_RECRUITER',
    });
    return;
  }
  next();
}
