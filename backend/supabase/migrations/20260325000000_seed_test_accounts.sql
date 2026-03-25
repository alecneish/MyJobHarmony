-- Seed data: two test accounts with different roles
-- The on_auth_user_created trigger will auto-create user_profiles rows.

DO $$
DECLARE
  _seeker_id    uuid := gen_random_uuid();
  _recruiter_id uuid := gen_random_uuid();
BEGIN
  -- ── Job Seeker account ────────────────────────────────────────────
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_user_meta_data,
    created_at, updated_at, confirmation_token, recovery_token
  ) VALUES (
    _seeker_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'candidate@test.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    now(),
    '{"role":"job_seeker","username":"testseeker"}'::jsonb,
    now(), now(), '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id,
    last_sign_in_at, created_at, updated_at
  ) VALUES (
    _seeker_id, _seeker_id,
    jsonb_build_object('sub', _seeker_id::text, 'email', 'candidate@test.com'),
    'email', _seeker_id::text,
    now(), now(), now()
  );

  -- ── Recruiter account ─────────────────────────────────────────────
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_user_meta_data,
    created_at, updated_at, confirmation_token, recovery_token
  ) VALUES (
    _recruiter_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'recruiter@test.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    now(),
    '{"role":"recruiter","username":"testrecruiter"}'::jsonb,
    now(), now(), '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id,
    last_sign_in_at, created_at, updated_at
  ) VALUES (
    _recruiter_id, _recruiter_id,
    jsonb_build_object('sub', _recruiter_id::text, 'email', 'recruiter@test.com'),
    'email', _recruiter_id::text,
    now(), now(), now()
  );
END $$;
