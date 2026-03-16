-- Career profiles (seed data lives in code, but store here for joins)
create table if not exists career_profiles (
  id          serial primary key,
  title       text not null,
  description text not null,
  -- OCEAN
  openness              numeric(5,1) not null,
  conscientiousness     numeric(5,1) not null,
  extraversion          numeric(5,1) not null,
  agreeableness         numeric(5,1) not null,
  emotional_stability   numeric(5,1) not null,
  -- RIASEC
  realistic     numeric(5,1) not null,
  investigative numeric(5,1) not null,
  artistic      numeric(5,1) not null,
  social        numeric(5,1) not null,
  enterprising  numeric(5,1) not null,
  conventional  numeric(5,1) not null,
  -- Values
  autonomy          numeric(5,1) not null,
  security          numeric(5,1) not null,
  challenge         numeric(5,1) not null,
  service           numeric(5,1) not null,
  work_life_balance numeric(5,1) not null,
  -- Environment
  pace          numeric(5,1) not null,
  collaboration numeric(5,1) not null,
  structure     numeric(5,1) not null,
  created_at    timestamptz default now()
);

-- One row per quiz attempt
create table if not exists quiz_sessions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid,           -- nullable: allow anonymous sessions
  created_at timestamptz default now()
);

-- Raw answers submitted by a user
create table if not exists quiz_responses (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null references quiz_sessions(id) on delete cascade,
  question_id int  not null,
  answer_value smallint not null check (answer_value between 1 and 5),
  created_at  timestamptz default now()
);

-- Per-subdimension and aggregate dimension scores
create table if not exists dimension_scores (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null references quiz_sessions(id) on delete cascade,
  dimension        text not null,
  subdimension     text not null default '',
  raw_score        numeric(5,2) not null,
  normalized_score numeric(5,1) not null,
  created_at       timestamptz default now()
);

-- Top career matches for a session
create table if not exists career_matches (
  id                uuid primary key default gen_random_uuid(),
  session_id        uuid not null references quiz_sessions(id) on delete cascade,
  career_profile_id int  not null references career_profiles(id),
  match_score       numeric(5,1) not null,
  rank              int  not null,
  created_at        timestamptz default now()
);

-- Indexes for common lookups
create index if not exists idx_quiz_responses_session   on quiz_responses(session_id);
create index if not exists idx_dimension_scores_session on dimension_scores(session_id);
create index if not exists idx_career_matches_session   on career_matches(session_id);
create index if not exists idx_career_matches_rank      on career_matches(session_id, rank);
