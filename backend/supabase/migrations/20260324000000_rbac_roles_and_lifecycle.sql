-- RBAC Phase 1: Canonical role enum + profile lifecycle columns
--
-- Migrates legacy 'candidate' values to 'job_seeker' and introduces
-- an enum type for compile-time safety in future queries.

-- Step 1: Drop the old text CHECK constraint (must happen before data migration)
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_role_check;

-- Step 2: Migrate existing data before altering the column type
UPDATE user_profiles SET role = 'job_seeker' WHERE role = 'candidate';

-- Step 3: Create the canonical role enum
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('job_seeker', 'recruiter', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Step 4: Convert the role column from text to enum
ALTER TABLE user_profiles
  ALTER COLUMN role TYPE user_role USING role::user_role,
  ALTER COLUMN role SET DEFAULT 'job_seeker'::user_role;

-- Step 5: Add lifecycle / authorization columns
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS verification_status text NOT NULL DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
  ADD COLUMN IF NOT EXISTS company_id uuid;

-- Step 6: Update the trigger function to map legacy 'candidate' -> 'job_seeker'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  _role text := COALESCE(NEW.raw_user_meta_data->>'role', 'job_seeker');
BEGIN
  IF _role = 'candidate' THEN
    _role := 'job_seeker';
  END IF;

  INSERT INTO public.user_profiles (id, username, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', ''),
    _role::public.user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Step 7: Indexes for common RBAC lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_active ON user_profiles(is_active) WHERE is_active = true;
