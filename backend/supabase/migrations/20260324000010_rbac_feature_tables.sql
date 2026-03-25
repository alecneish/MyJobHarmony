-- RBAC Phase 2: Feature tables with ownership constraints
--
-- All role-scoped records reference auth.users(id) via UUID so
-- middleware and RLS policies can enforce tenant isolation.

-- ── Companies ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS companies (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text,
  website     text,
  logo_url    text,
  verification_status text NOT NULL DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
  owner_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- FK from user_profiles.company_id → companies
ALTER TABLE user_profiles
  ADD CONSTRAINT fk_user_profiles_company
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL;

-- ── Job postings (recruiter-managed) ──────────────────────────────
CREATE TABLE IF NOT EXISTS job_postings (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id      uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title           text NOT NULL,
  description     text,
  location        text NOT NULL DEFAULT '',
  salary_range    text NOT NULL DEFAULT '',
  employment_type text NOT NULL DEFAULT 'full-time',
  status          text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'open', 'closed', 'archived')),
  personality_type text,
  tags            text NOT NULL DEFAULT '',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ── Candidate profiles (extended data for job seekers) ────────────
CREATE TABLE IF NOT EXISTS candidate_profiles (
  id                        uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  headline                  text,
  bio                       text,
  resume_url                text,
  portfolio_url             text,
  skills                    text NOT NULL DEFAULT '',
  experience_years          integer DEFAULT 0,
  preferred_locations       text NOT NULL DEFAULT '',
  preferred_employment_types text NOT NULL DEFAULT '',
  notification_preferences  jsonb NOT NULL DEFAULT '{}',
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);

-- ── Job applications ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_applications (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_posting_id  uuid NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
  candidate_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status          text NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted', 'reviewed', 'shortlisted', 'interview', 'offered', 'rejected', 'withdrawn')),
  cover_letter    text,
  resume_url      text,
  applied_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (job_posting_id, candidate_id)
);

-- ── Saved jobs (UUID-based, tied to auth.users) ──────────────────
CREATE TABLE IF NOT EXISTS saved_jobs_auth (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_posting_id  uuid NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
  saved_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, job_posting_id)
);

-- ── Conversations ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recruiter_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_posting_id  uuid REFERENCES job_postings(id) ON DELETE SET NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (candidate_id, recruiter_id, job_posting_id)
);

-- ── Messages ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content         text NOT NULL,
  read_at         timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_companies_owner          ON companies(owner_id);
CREATE INDEX IF NOT EXISTS idx_job_postings_recruiter   ON job_postings(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_job_postings_company     ON job_postings(company_id);
CREATE INDEX IF NOT EXISTS idx_job_postings_status      ON job_postings(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_job     ON job_applications(job_posting_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_cand    ON job_applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status  ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_auth_user     ON saved_jobs_auth(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_candidate  ON conversations(candidate_id);
CREATE INDEX IF NOT EXISTS idx_conversations_recruiter  ON conversations(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation    ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender          ON messages(sender_id);

-- ── Updated-at triggers (reuses handle_updated_at from earlier migration) ─
CREATE TRIGGER handle_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_job_postings_updated_at
  BEFORE UPDATE ON job_postings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_candidate_profiles_updated_at
  BEFORE UPDATE ON candidate_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
