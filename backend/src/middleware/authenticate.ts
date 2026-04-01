import { Request, Response, NextFunction } from 'express';
import { supabase } from '../db/database';

export interface AuthUser {
  id: string;
  email?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  role: 'job_seeker' | 'recruiter' | 'admin';
  is_active: boolean;
  verification_status: 'unverified' | 'pending' | 'verified' | 'rejected';
  company_id: string | null;
}

export interface AuthenticatedRequest extends Request {
  /** Set when a valid bearer token is present (optionalAuth, authenticate). */
  authUser?: AuthUser;
  /** Set when a user_profiles row exists for the user (authenticate always; optionalAuth when present). */
  userProfile?: UserProfile;
}

function normalizeRole(role: string): UserProfile['role'] {
  if (role === 'candidate') return 'job_seeker';
  if (['job_seeker', 'recruiter', 'admin'].includes(role)) {
    return role as UserProfile['role'];
  }
  return 'job_seeker';
}

function buildProfile(raw: Record<string, unknown>): UserProfile {
  return {
    id: raw.id as string,
    username: (raw.username as string) ?? '',
    role: normalizeRole(raw.role as string),
    is_active: (raw.is_active as boolean) ?? true,
    verification_status:
      (raw.verification_status as UserProfile['verification_status']) ?? 'unverified',
    company_id: (raw.company_id as string) ?? null,
  };
}

/**
 * Validates the Supabase JWT from the Authorization header, loads the
 * user profile, and attaches both to the request object. Returns 401
 * if the token is missing/invalid, 403 if the profile is missing.
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid authorization header' });
      return;
    }

    const token = authHeader.slice(7);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError || !profile) {
      res.status(403).json({ error: 'User profile not found' });
      return;
    }

    (req as AuthenticatedRequest).authUser = {
      id: user.id,
      email: user.email,
    };
    (req as AuthenticatedRequest).userProfile = buildProfile(profile);

    next();
  } catch {
    res.status(500).json({ error: 'Authentication failed' });
  }
}

/**
 * Like `authenticate`, but silently continues if no token is present.
 * Useful for endpoints where auth is beneficial but not required
 * (e.g. quiz submit — binds session to user when logged in).
 */
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.slice(7);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      next();
      return;
    }

    (req as AuthenticatedRequest).authUser = {
      id: user.id,
      email: user.email,
    };

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profile) {
      (req as AuthenticatedRequest).userProfile = buildProfile(profile);
    }

    next();
  } catch {
    next();
  }
}
