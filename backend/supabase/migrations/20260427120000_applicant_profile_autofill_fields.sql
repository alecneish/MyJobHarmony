alter table if exists "Applicants"
  add column if not exists "Location" text null,
  add column if not exists "YearsOfExperience" integer null,
  add column if not exists "LinkedInUrl" text null,
  add column if not exists "Education" jsonb not null default '[]'::jsonb,
  add column if not exists "WorkExperience" jsonb not null default '[]'::jsonb;
