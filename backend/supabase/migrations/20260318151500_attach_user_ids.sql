-- Attach quiz sessions to Supabase auth users (nullable for anonymous sessions)
ALTER TABLE quiz_sessions
  ADD CONSTRAINT quiz_sessions_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id)
    ON DELETE SET NULL;

-- Helpful index for user-specific lookups
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_id ON quiz_sessions(user_id);
