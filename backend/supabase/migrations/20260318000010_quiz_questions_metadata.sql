-- Extend QuizQuestions to support scoring engine metadata.

alter table if exists "QuizQuestions"
  add column if not exists "Dimension" text not null default '',
  add column if not exists "Subdimension" text not null default '',
  add column if not exists "Section" text not null default '',
  add column if not exists "SectionOrder" integer not null default 0,
  add column if not exists "QuestionFormat" text not null default 'Likert',
  add column if not exists "IsReverseScored" boolean not null default false,
  add column if not exists "Weight" numeric(5,2) not null default 1.0,
  add column if not exists "Tier" text not null default 'Free';

