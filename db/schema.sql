-- =============================================================
-- JobHarmony Database Schema
-- Database: SQLite (managed by Entity Framework Core)
-- To apply: dotnet ef database update
-- =============================================================

-- Users
-- Stores registered user accounts. Authentication not yet implemented;
-- PasswordHash is nullable so anonymous quiz results can still be saved.
CREATE TABLE IF NOT EXISTS "Users" (
    "Id"           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email"        TEXT    NOT NULL UNIQUE,
    "PasswordHash" TEXT    NULL,
    "CreatedAt"    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Applicants
-- A profile linked to a user. Tracks personality and resume fit.
-- UserId is nullable so applicant profiles can exist before a user account is created.
CREATE TABLE IF NOT EXISTS "Applicants" (
    "Id"                   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserId"               INTEGER NULL UNIQUE,
    "Name"                 TEXT    NOT NULL,
    "Initials"             TEXT    NOT NULL DEFAULT '',
    "AvatarColor"          TEXT    NOT NULL DEFAULT '',
    "Bio"                  TEXT    NULL,
    "ResumeUrl"            TEXT    NULL,
    "ResumeFitPercent"     INTEGER NOT NULL DEFAULT 0,
    "PersonalityFitPercent" INTEGER NOT NULL DEFAULT 0,
    "Skills"               TEXT    NOT NULL DEFAULT '',   -- comma-separated list
    "IsRecommended"        INTEGER NOT NULL DEFAULT 0,   -- boolean (0/1)
    "Title"                TEXT    NOT NULL DEFAULT '',
    FOREIGN KEY ("UserId") REFERENCES "Users" ("Id")
);

-- Jobs
-- Job listings that applicants can browse, save, and be matched to.
CREATE TABLE IF NOT EXISTS "Jobs" (
    "Id"             INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title"          TEXT    NOT NULL,
    "Company"        TEXT    NOT NULL,
    "LogoEmoji"      TEXT    NOT NULL DEFAULT '',
    "Location"       TEXT    NOT NULL DEFAULT '',
    "Salary"         TEXT    NOT NULL DEFAULT '',
    "Type"           TEXT    NOT NULL DEFAULT '',         -- Full-time, Part-time, Contract
    "Description"    TEXT    NULL,
    "PersonalityType" TEXT   NULL,                        -- matched motivation type
    "FitScore"       INTEGER NOT NULL DEFAULT 0,          -- 0-100
    "FitLevel"       TEXT    NOT NULL DEFAULT '',         -- Excellent, Great, Good, Moderate
    "FitReason"      TEXT    NOT NULL DEFAULT '',
    "Tags"           TEXT    NOT NULL DEFAULT '',         -- comma-separated list
    "PostedDaysAgo"  INTEGER NOT NULL DEFAULT 0
);

-- QuizQuestions
-- The personality quiz questions (Big Five / OCEAN model).
CREATE TABLE IF NOT EXISTS "QuizQuestions" (
    "Id"           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "QuestionText" TEXT    NOT NULL
);

-- QuizOptions
-- Answer choices for each quiz question. Each option is weighted
-- toward one of the Big Five personality traits.
CREATE TABLE IF NOT EXISTS "QuizOptions" (
    "Id"         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "QuestionId" INTEGER NOT NULL,
    "Label"      TEXT    NOT NULL,
    "Trait"      TEXT    NOT NULL,   -- openness | conscientiousness | extraversion | agreeableness | emotionalStability
    "Weight"     INTEGER NOT NULL DEFAULT 1,  -- 1-3
    FOREIGN KEY ("QuestionId") REFERENCES "QuizQuestions" ("Id") ON DELETE CASCADE
);

-- QuizResults
-- Stores the computed Big Five scores after a user completes the quiz.
-- One-to-one with Applicants. ApplicantId is nullable so anonymous
-- (unauthenticated) quiz submissions can still be persisted.
CREATE TABLE IF NOT EXISTS "QuizResults" (
    "Id"                 INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ApplicantId"        INTEGER NULL UNIQUE,
    "Openness"           INTEGER NOT NULL DEFAULT 0,   -- 0-100
    "Conscientiousness"  INTEGER NOT NULL DEFAULT 0,
    "Extraversion"       INTEGER NOT NULL DEFAULT 0,
    "Agreeableness"      INTEGER NOT NULL DEFAULT 0,
    "EmotionalStability" INTEGER NOT NULL DEFAULT 0,
    "DominantTrait"      TEXT    NOT NULL DEFAULT '',
    "MotivationType"     TEXT    NOT NULL DEFAULT '',  -- e.g. "The Innovator"
    "CreatedAt"          TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY ("ApplicantId") REFERENCES "Applicants" ("Id")
);

-- SavedJobs
-- Many-to-many join between Applicants and Jobs.
-- Unique constraint prevents an applicant from saving the same job twice.
CREATE TABLE IF NOT EXISTS "SavedJobs" (
    "Id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ApplicantId" INTEGER NOT NULL,
    "JobId"       INTEGER NOT NULL,
    "SavedAt"     TEXT    NOT NULL DEFAULT (datetime('now')),
    UNIQUE ("ApplicantId", "JobId"),
    FOREIGN KEY ("ApplicantId") REFERENCES "Applicants" ("Id") ON DELETE CASCADE,
    FOREIGN KEY ("JobId")       REFERENCES "Jobs"       ("Id") ON DELETE CASCADE
);

-- JobTags
-- Normalized tags for each job listing (one-to-many from Jobs).
CREATE TABLE IF NOT EXISTS "JobTags" (
    "Id"      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "JobId"   INTEGER NOT NULL,
    "TagName" TEXT    NOT NULL,
    FOREIGN KEY ("JobId") REFERENCES "Jobs" ("Id") ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS "IX_QuizOptions_QuestionId" ON "QuizOptions" ("QuestionId");
CREATE INDEX IF NOT EXISTS "IX_JobTags_JobId"           ON "JobTags"    ("JobId");
CREATE INDEX IF NOT EXISTS "IX_SavedJobs_JobId"         ON "SavedJobs"  ("JobId");
