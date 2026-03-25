-- Enable RLS and add policies so authenticated users can access their own data.

-- ── user_profiles ────────────────────────────────────────────────────
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow the trigger (runs as SECURITY DEFINER) to insert profiles
-- by granting insert to authenticated role with no user restriction,
-- since inserts come from the handle_new_user trigger.
CREATE POLICY "Service can insert profiles"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ── candidate_profiles ───────────────────────────────────────────────
ALTER TABLE candidate_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own candidate profile"
  ON candidate_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can upsert own candidate profile"
  ON candidate_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own candidate profile"
  ON candidate_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── companies ────────────────────────────────────────────────────────
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can view companies
CREATE POLICY "Authenticated users can view companies"
  ON companies FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Owner can insert company"
  ON companies FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owner can update company"
  ON companies FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- ── job_postings ─────────────────────────────────────────────────────
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

-- Anyone can view open job postings
CREATE POLICY "Anyone can view job postings"
  ON job_postings FOR SELECT
  USING (true);

CREATE POLICY "Recruiter can insert own postings"
  ON job_postings FOR INSERT
  WITH CHECK (auth.uid() = recruiter_id);

CREATE POLICY "Recruiter can update own postings"
  ON job_postings FOR UPDATE
  USING (auth.uid() = recruiter_id)
  WITH CHECK (auth.uid() = recruiter_id);

CREATE POLICY "Recruiter can delete own postings"
  ON job_postings FOR DELETE
  USING (auth.uid() = recruiter_id);

-- ── job_applications ─────────────────────────────────────────────────
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidate can view own applications"
  ON job_applications FOR SELECT
  USING (auth.uid() = candidate_id);

CREATE POLICY "Candidate can insert application"
  ON job_applications FOR INSERT
  WITH CHECK (auth.uid() = candidate_id);

-- Recruiters can view applications for their postings
CREATE POLICY "Recruiter can view applications for own postings"
  ON job_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM job_postings
      WHERE job_postings.id = job_applications.job_posting_id
        AND job_postings.recruiter_id = auth.uid()
    )
  );

-- ── saved_jobs_auth ──────────────────────────────────────────────────
ALTER TABLE saved_jobs_auth ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved jobs"
  ON saved_jobs_auth FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── conversations ────────────────────────────────────────────────────
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can view own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = candidate_id OR auth.uid() = recruiter_id);

CREATE POLICY "Participants can insert conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = candidate_id OR auth.uid() = recruiter_id);

-- ── messages ─────────────────────────────────────────────────────────
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can view messages in own conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
        AND (conversations.candidate_id = auth.uid() OR conversations.recruiter_id = auth.uid())
    )
  );

CREATE POLICY "Participants can send messages in own conversations"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
        AND (conversations.candidate_id = auth.uid() OR conversations.recruiter_id = auth.uid())
    )
  );
