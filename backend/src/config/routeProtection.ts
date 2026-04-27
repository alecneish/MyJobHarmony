/**
 * Authoritative route-access matrix for the RBAC system.
 *
 * This module is the single source of truth for which roles can access
 * which routes. It can be consumed by automated tests, admin tooling,
 * or documentation generators.
 *
 * Verification checklist (manual or automated):
 *
 *  1. Unauthenticated request to protected route -> 401
 *  2. Wrong-role request to role-gated route    -> 403
 *  3. Deactivated account on any auth route     -> 403 "Account is deactivated"
 *  4. Expired JWT on any auth route             -> 401 "Invalid or expired token"
 *  5. Legacy 'candidate' role in DB             -> normalized to 'job_seeker' in middleware
 *  6. Admin enum value stored but no routes     -> 403 on role-gated routes
 *  7. Frontend RequireAuth redirect             -> unauthenticated -> /login
 *  8. Frontend RequireRole redirect             -> wrong role -> /unauthorized
 *  9. Frontend apiClient 401 handling           -> signOut + /login redirect
 */

export type AccessLevel =
  | 'public'
  | 'authenticated'
  | 'job_seeker'
  | 'admin'
  | 'owner';

export interface RouteRule {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  access: AccessLevel;
  description: string;
}

export const API_ROUTE_RULES: RouteRule[] = [
  // ── Public ──
  { method: 'GET',  path: '/api/health',             access: 'public',              description: 'Health check' },
  { method: 'GET',  path: '/api/jobs',               access: 'public',              description: 'List job postings (public projection)' },
  { method: 'GET',  path: '/api/jobs/:id',           access: 'public',              description: 'Single job posting (public projection)' },
  { method: 'GET',  path: '/api/quiz/questions',     access: 'public',              description: 'Quiz questions' },
  { method: 'POST', path: '/api/quiz/submit',        access: 'public',              description: 'Submit quiz (optionalAuth binds user if present)' },

  // ── Job Seeker ──
  { method: 'GET',  path: '/api/me/profile',         access: 'job_seeker',          description: 'View own candidate profile' },
  { method: 'PATCH',path: '/api/me/profile',         access: 'job_seeker',          description: 'Edit own candidate profile' },
  { method: 'POST', path: '/api/me/resume',          access: 'job_seeker',          description: 'Upload resume' },
  { method: 'POST', path: '/api/jobs/:id/apply',     access: 'job_seeker',          description: 'Apply to job posting' },
  { method: 'GET',  path: '/api/me/applications',    access: 'job_seeker',          description: 'View own applications' },
  { method: 'GET',  path: '/api/me/saved-jobs',      access: 'job_seeker',          description: 'List saved/bookmarked jobs' },
  { method: 'POST', path: '/api/me/saved-jobs/:id',  access: 'job_seeker',          description: 'Bookmark a job' },
  { method: 'DELETE',path: '/api/me/saved-jobs/:id', access: 'job_seeker',          description: 'Remove a bookmark' },

  // ── Messaging (relationship-constrained) ──
  { method: 'GET',  path: '/api/messages/conversations',            access: 'authenticated', description: 'List own conversations' },
  { method: 'GET',  path: '/api/messages/conversations/:id',        access: 'owner',         description: 'Read conversation (participant only)' },
  { method: 'POST', path: '/api/messages/conversations/:id/messages',access: 'owner',        description: 'Send message (participant only)' },
];

export interface FrontendRouteRule {
  path: string;
  access: AccessLevel;
  description: string;
}

export const FRONTEND_ROUTE_RULES: FrontendRouteRule[] = [
  // ── Public ──
  { path: '/',                   access: 'public',      description: 'Landing / marketing page' },
  { path: '/login',              access: 'public',      description: 'Login page' },
  { path: '/signup',             access: 'public',      description: 'Registration page' },
  { path: '/jobs',               access: 'public',      description: 'Browse job listings' },
  { path: '/quiz',               access: 'public',      description: 'Quiz landing page' },
  { path: '/quiz/interface',     access: 'public',      description: 'Quiz stepper UI' },
  { path: '/quiz/results',       access: 'public',      description: 'Quiz results display' },
  { path: '/unauthorized',       access: 'public',      description: 'Access denied page' },

  // ── Job Seeker ──
  { path: '/candidate/dashboard',access: 'job_seeker',  description: 'Candidate home dashboard' },
  { path: '/jobs/saved',         access: 'job_seeker',  description: 'Saved/bookmarked jobs' },

];

/**
 * Phased rollout plan:
 *
 * Phase 1 (Foundation) - DONE
 *   - user_role enum migration (job_seeker, admin)
 *   - user_profiles lifecycle columns (is_active, deleted_at, verification_status)
 *   - Express auth middleware stack (authenticate, optionalAuth, requireRole, requireActive)
 *
 * Phase 2 (API enforcement) - DONE
 *   - /api/quiz/submit bound to authenticated user via optionalAuth
 *   - Global error handler for async middleware
 *
 * Phase 3 (Frontend gating) - DONE
 *   - RequireAuth, RequireRole, RoleGuard components
 *   - Route tree restructured with nested guard wrappers
 *   - Layout.tsx role-conditional navigation
 *   - apiClient with JWT injection and 401/403 handling
 *
 * Phase 4 (Feature RBAC completion) - NEXT
 *   - Implement /api/me/* candidate profile CRUD
 *   - Implement /api/messages/* with relationship enforcement
 *   - Server-side saved jobs (replace localStorage)
 *   - Supabase RLS policies for direct-client access paths
 *
 * Phase 5 (Hardening)
 *   - Automated test suite covering all rows in API_ROUTE_RULES
 *   - Audit log table for auth events (login, role change, deactivation)
 *   - Rate limiting on auth endpoints
 *   - CORS tightening for production origins
 */
