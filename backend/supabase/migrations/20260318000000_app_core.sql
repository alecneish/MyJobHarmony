-- Core application tables (ported from legacy SQLite schema).
-- These are used for demo data / recruiter view / jobs list.

create table if not exists "Users" (
  "Id"           serial primary key,
  "Email"        text not null unique,
  "PasswordHash" text null,
  "CreatedAt"    timestamptz not null default now()
);

create table if not exists "Applicants" (
  "Id"                    serial primary key,
  "UserId"                integer null unique,
  "Name"                  text not null,
  "Initials"              text not null default '',
  "AvatarColor"           text not null default '',
  "Bio"                   text null,
  "ResumeUrl"             text null,
  "ResumeFitPercent"      integer not null default 0,
  "PersonalityFitPercent" integer not null default 0,
  "Skills"                text not null default '',
  "IsRecommended"         integer not null default 0,
  "Title"                 text not null default '',
  constraint "FK_Applicants_Users_UserId" foreign key ("UserId") references "Users" ("Id")
);

create table if not exists "Jobs" (
  "Id"             serial primary key,
  "Title"          text not null,
  "Company"        text not null,
  "LogoEmoji"      text not null default '',
  "Location"       text not null default '',
  "Salary"         text not null default '',
  "Type"           text not null default '',
  "Description"    text null,
  "PersonalityType" text null,
  "FitScore"       integer not null default 0,
  "FitLevel"       text not null default '',
  "FitReason"      text not null default '',
  "Tags"           text not null default '',
  "PostedDaysAgo"  integer not null default 0
);

create table if not exists "QuizQuestions" (
  "Id"           serial primary key,
  "QuestionText" text not null
);

create table if not exists "QuizOptions" (
  "Id"         serial primary key,
  "QuestionId" integer not null,
  "Label"      text not null,
  "Trait"      text not null,
  "Weight"     integer not null default 1,
  constraint "FK_QuizOptions_QuizQuestions_QuestionId"
    foreign key ("QuestionId") references "QuizQuestions" ("Id") on delete cascade
);

create table if not exists "QuizResults" (
  "Id"                 serial primary key,
  "ApplicantId"        integer null unique,
  "Openness"           integer not null default 0,
  "Conscientiousness"  integer not null default 0,
  "Extraversion"       integer not null default 0,
  "Agreeableness"      integer not null default 0,
  "EmotionalStability" integer not null default 0,
  "DominantTrait"      text not null default '',
  "MotivationType"     text not null default '',
  "CreatedAt"          timestamptz not null default now(),
  constraint "FK_QuizResults_Applicants_ApplicantId"
    foreign key ("ApplicantId") references "Applicants" ("Id")
);

create table if not exists "SavedJobs" (
  "Id"          serial primary key,
  "ApplicantId" integer not null,
  "JobId"       integer not null,
  "SavedAt"     timestamptz not null default now(),
  constraint "UQ_SavedJobs_ApplicantId_JobId" unique ("ApplicantId", "JobId"),
  constraint "FK_SavedJobs_Applicants_ApplicantId"
    foreign key ("ApplicantId") references "Applicants" ("Id") on delete cascade,
  constraint "FK_SavedJobs_Jobs_JobId"
    foreign key ("JobId") references "Jobs" ("Id") on delete cascade
);

create table if not exists "JobTags" (
  "Id"      serial primary key,
  "JobId"   integer not null,
  "TagName" text not null,
  constraint "FK_JobTags_Jobs_JobId"
    foreign key ("JobId") references "Jobs" ("Id") on delete cascade
);

create index if not exists "IX_QuizOptions_QuestionId" on "QuizOptions" ("QuestionId");
create index if not exists "IX_JobTags_JobId" on "JobTags" ("JobId");
create index if not exists "IX_SavedJobs_JobId" on "SavedJobs" ("JobId");

