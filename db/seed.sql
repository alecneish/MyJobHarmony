-- =============================================================
-- JobHarmony Seed Data
-- Database: SQLite (managed by Entity Framework Core)
-- NOTE: EF Core auto-applies migrations on startup.
-- Run this file manually only if you need to seed via psql/sqlite3.
-- =============================================================

-- Users
INSERT INTO "Users" ("Email", "PasswordHash", "CreatedAt") VALUES
    ('sarah.chen@example.com',   NULL, '2025-01-10 08:00:00'),
    ('marcus.j@example.com',     NULL, '2025-01-12 09:15:00'),
    ('emily.rodriguez@example.com', NULL, '2025-01-15 11:30:00'),
    ('david.kim@example.com',    NULL, '2025-01-18 14:00:00'),
    ('aisha.patel@example.com',  NULL, '2025-01-20 16:45:00');

-- Applicants
INSERT INTO "Applicants" ("UserId", "Name", "Initials", "AvatarColor", "Bio", "ResumeFitPercent", "PersonalityFitPercent", "Skills", "IsRecommended", "Title") VALUES
    (1, 'Sarah Chen',     'SC', '#E67E22', 'Senior UX designer passionate about human-centered design.',     94, 91, 'UX Design,Figma,User Research,Prototyping',           1, 'Senior UX Designer'),
    (2, 'Marcus Johnson', 'MJ', '#3498DB', 'Product manager with 8 years of agile and SaaS experience.',    89, 87, 'Product Strategy,Agile,Data Analysis,Leadership',     1, 'Product Manager'),
    (3, 'Emily Rodriguez','ER', '#2ECC71', 'Data scientist specializing in ML models and predictive analytics.', 92, 85, 'Python,TensorFlow,SQL,Statistics',               1, 'Data Scientist'),
    (4, 'David Kim',      'DK', '#9B59B6', 'Full stack developer focused on React and Node.js ecosystems.',  88, 90, 'React,TypeScript,Node.js,GraphQL',                    1, 'Full Stack Developer'),
    (5, 'Aisha Patel',    'AP', '#E74C3C', 'Community builder with a background in social media strategy.',  91, 88, 'Content Strategy,Social Media,Community Building,Events', 1, 'Community Manager');

-- Jobs
INSERT INTO "Jobs" ("Title", "Company", "LogoEmoji", "Location", "Salary", "Type", "Description", "PersonalityType", "FitScore", "FitLevel", "FitReason", "Tags", "PostedDaysAgo") VALUES
    ('Senior UX Designer',  'DesignCraft Studio', '🎨', 'San Francisco, CA', '$120k - $160k', 'Full-time',
     'Lead the UX design process for a suite of enterprise SaaS products.',
     'The Innovator', 95, 'Excellent',
     'Your creative thinking and openness to new ideas align perfectly with this design-focused role.',
     'Design,UX,Creative,Remote-friendly', 2),

    ('Product Manager', 'TechFlow Inc', '🚀', 'New York, NY', '$130k - $170k', 'Full-time',
     'Own the product roadmap and drive cross-functional execution for a B2B platform.',
     'The Achiever', 88, 'Great',
     'Your leadership skills and structured thinking make you a strong fit for product management.',
     'Product,Leadership,Strategy,Agile', 3),

    ('Data Scientist', 'Analytics Pro', '📊', 'Remote', '$110k - $150k', 'Full-time',
     'Build and deploy ML models that power our personalization engine.',
     'The Achiever', 82, 'Great',
     'Your analytical mindset and conscientiousness are ideal for data-driven decision making.',
     'Data,Python,Machine Learning,Analytics', 1),

    ('Community Manager', 'SocialBuzz', '🌟', 'Austin, TX', '$70k - $90k', 'Full-time',
     'Grow and engage our online community across Discord, Reddit, and social media.',
     'The Harmonizer', 78, 'Good',
     'Your people skills and agreeableness make community building a natural strength.',
     'Community,Social Media,Marketing,Events', 5),

    ('Frontend Developer', 'WebWorks Agency', '💻', 'Remote', '$100k - $140k', 'Contract',
     'Craft accessible, performant UI components for a portfolio of client web apps.',
     'The Innovator', 91, 'Excellent',
     'Your creativity and attention to detail are perfect for crafting beautiful user interfaces.',
     'React,TypeScript,CSS,Frontend', 1);

-- QuizQuestions
INSERT INTO "QuizQuestions" ("QuestionText") VALUES
    ('When starting a new project, what excites you most?'),
    ('How do you handle a stressful deadline?'),
    ('What kind of work environment do you prefer?'),
    ('When receiving critical feedback, you typically...'),
    ('What motivates you most at work?');

-- QuizOptions (QuestionId 1)
INSERT INTO "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") VALUES
    (1, 'Exploring creative possibilities and brainstorming ideas', 'openness',          3),
    (1, 'Creating a detailed plan and timeline',                    'conscientiousness', 3),
    (1, 'Collaborating with the team and assigning roles',          'extraversion',      3),
    (1, 'Understanding how it will help others',                    'agreeableness',     3);

-- QuizOptions (QuestionId 2)
INSERT INTO "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") VALUES
    (2, 'Stay calm and adapt as needed',             'emotionalStability', 3),
    (2, 'Break it down into manageable chunks',      'conscientiousness',  3),
    (2, 'Rally the team for a group push',           'extraversion',       3),
    (2, 'Find an innovative shortcut',               'openness',           3);

-- QuizOptions (QuestionId 3)
INSERT INTO "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") VALUES
    (3, 'Open office with lots of interaction',  'extraversion',      3),
    (3, 'Quiet space for deep focused work',     'conscientiousness', 2),
    (3, 'Flexible and ever-changing',            'openness',          3),
    (3, 'Supportive and team-oriented',          'agreeableness',     3);

-- QuizOptions (QuestionId 4)
INSERT INTO "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") VALUES
    (4, 'Take it in stride and use it to improve',         'emotionalStability', 3),
    (4, 'Analyze it carefully and create an action plan',  'conscientiousness',  3),
    (4, 'Discuss it openly with the feedback giver',       'extraversion',       2),
    (4, 'Consider how to use it to help the whole team',   'agreeableness',      3);

-- QuizOptions (QuestionId 5)
INSERT INTO "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") VALUES
    (5, 'Learning new skills and technologies',    'openness',          3),
    (5, 'Achieving measurable goals and milestones','conscientiousness', 3),
    (5, 'Building relationships and networking',   'extraversion',      3),
    (5, 'Maintaining balance and inner peace',     'emotionalStability',3);

-- JobTags (normalized tags for the 5 seeded jobs)
INSERT INTO "JobTags" ("JobId", "TagName") VALUES
    (1, 'Design'), (1, 'UX'), (1, 'Creative'), (1, 'Remote-friendly'),
    (2, 'Product'), (2, 'Leadership'), (2, 'Strategy'), (2, 'Agile'),
    (3, 'Data'), (3, 'Python'), (3, 'Machine Learning'), (3, 'Analytics'),
    (4, 'Community'), (4, 'Social Media'), (4, 'Marketing'), (4, 'Events'),
    (5, 'React'), (5, 'TypeScript'), (5, 'CSS'), (5, 'Frontend');

-- QuizResults (sample saved results)
INSERT INTO "QuizResults" ("ApplicantId", "Openness", "Conscientiousness", "Extraversion", "Agreeableness", "EmotionalStability", "DominantTrait", "MotivationType", "CreatedAt") VALUES
    (1, 88, 65, 60, 72, 68, 'openness',          'The Innovator',  '2025-01-10 10:00:00'),
    (2, 60, 90, 75, 65, 80, 'conscientiousness', 'The Achiever',   '2025-01-12 11:00:00'),
    (3, 70, 85, 55, 60, 78, 'conscientiousness', 'The Achiever',   '2025-01-15 12:00:00'),
    (4, 75, 70, 80, 65, 72, 'extraversion',      'The Connector',  '2025-01-18 14:30:00'),
    (5, 65, 60, 85, 88, 70, 'agreeableness',     'The Harmonizer', '2025-01-20 17:00:00');

-- SavedJobs (sample bookmarks)
INSERT INTO "SavedJobs" ("ApplicantId", "JobId", "SavedAt") VALUES
    (1, 1, '2025-01-11 09:00:00'),
    (1, 5, '2025-01-11 09:05:00'),
    (2, 2, '2025-01-13 10:00:00'),
    (3, 3, '2025-01-16 08:30:00'),
    (4, 5, '2025-01-19 15:00:00');
