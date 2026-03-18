-- Seed career_profiles so that foreign keys from career_matches always resolve.
-- Trait values here are not used by the matching engine (it uses in-code profiles),
-- so we can use neutral (50.0) defaults; titles/descriptions just need stable IDs.

with careers (id, title, description) as (
  values
    (1,  'Software Developer', 'Design, build, and maintain software applications and systems.'),
    (2,  'Data Scientist', 'Analyze complex data sets to find patterns, build predictive models, and drive business decisions.'),
    (3,  'UX Designer', 'Research user needs and design intuitive, delightful digital experiences.'),
    (4,  'Cybersecurity Analyst', 'Protect organizations from digital threats by monitoring, detecting, and responding to security incidents.'),
    (5,  'Product Manager', 'Define product vision and strategy, prioritize features, and coordinate cross-functional teams.'),
    (6,  'DevOps Engineer', 'Build and maintain the infrastructure, CI/CD pipelines, and systems that keep software running reliably.'),
    (7,  'IT Project Manager', 'Plan, execute, and deliver technology projects on time and within budget.'),
    (8,  'Web Developer', 'Build and maintain websites and web applications using modern frameworks and technologies.'),
    (9,  'Game Designer', 'Conceptualize and design video game mechanics, narratives, levels, and player experiences.'),
    (10, 'Registered Nurse', 'Provide direct patient care, administer treatments, and coordinate with healthcare teams.'),
    (11, 'Physician', 'Diagnose illnesses, prescribe treatments, and guide patients through complex health decisions.'),
    (12, 'Physical Therapist', 'Help patients recover movement and manage pain through targeted exercise and rehabilitation programs.'),
    (13, 'Mental Health Counselor', 'Support individuals through emotional, behavioral, and psychological challenges using therapeutic techniques.'),
    (14, 'Healthcare Administrator', 'Manage the operations of hospitals, clinics, or healthcare systems to ensure quality patient care.'),
    (15, 'Pharmacist', 'Dispense medications, counsel patients on drug interactions, and ensure safe pharmaceutical care.'),
    (16, 'Dental Hygienist', 'Clean teeth, examine patients for oral diseases, and provide preventive dental care.'),
    (17, 'Veterinarian', 'Diagnose and treat diseases and injuries in animals, and advise pet owners on animal care.'),
    (18, 'Personal Trainer / Fitness Coach', 'Design exercise programs and motivate clients to achieve their health and fitness goals.'),
    (19, 'Psychologist', 'Study human behavior and mental processes, and provide therapy or conduct research.'),
    (20, 'Occupational Therapist', 'Help patients develop or recover daily living and work skills after injury, illness, or disability.'),
    (21, 'Financial Analyst', 'Evaluate investment opportunities, analyze financial data, and advise organizations on fiscal strategy.'),
    (22, 'Marketing Manager', 'Develop and execute marketing strategies to grow brand awareness and drive revenue.'),
    (23, 'Management Consultant', 'Advise organizations on strategy, operations, and transformation to solve complex business problems.'),
    (24, 'Accountant', 'Prepare financial records, ensure tax compliance, and provide fiscal accountability for organizations.'),
    (25, 'Human Resources Manager', 'Oversee recruiting, employee relations, training, and organizational culture initiatives.'),
    (26, 'Entrepreneur', 'Build and grow a business from the ground up, taking on risk and wearing many hats.'),
    (27, 'Real Estate Agent', 'Help clients buy, sell, and rent properties by providing market expertise and negotiation skills.'),
    (28, 'Supply Chain / Logistics Manager', 'Coordinate the flow of goods from suppliers to customers, optimizing efficiency and reducing costs.'),
    (29, 'Event Planner', 'Organize and coordinate events such as conferences, weddings, and corporate gatherings.'),
    (30, 'Sales Representative', 'Sell products or services to businesses or consumers through relationship-building and persuasion.'),
    (31, 'Graphic Designer', 'Create visual concepts using software or by hand to communicate ideas that inspire and inform.'),
    (32, 'Content Writer / Copywriter', 'Write compelling articles, marketing copy, or content that engages audiences and drives action.'),
    (33, 'Video Producer / Filmmaker', 'Plan, shoot, and edit video content for entertainment, marketing, or educational purposes.'),
    (34, 'Architect', 'Design buildings and structures that are functional, safe, and aesthetically compelling.'),
    (35, 'Interior Designer', 'Transform indoor spaces to be beautiful, functional, and reflective of clients'' needs.'),
    (36, 'Musician / Composer', 'Create, perform, or produce music for entertainment, media, or personal expression.'),
    (37, 'K-12 Teacher', 'Educate students, develop curriculum, and foster a positive learning environment.'),
    (38, 'College Professor', 'Conduct research, teach university courses, and mentor graduate students in your field of expertise.'),
    (39, 'School Counselor', 'Guide students through academic planning, social challenges, and career exploration.'),
    (40, 'Corporate Trainer', 'Design and deliver training programs that develop employees'' skills and improve organizational performance.'),
    (41, 'Instructional Designer', 'Create effective learning experiences and educational materials using research-based design principles.'),
    (42, 'Librarian / Information Specialist', 'Organize, curate, and provide access to information resources, and help patrons with research.'),
    (43, 'Electrician', 'Install, maintain, and repair electrical systems in buildings, factories, and infrastructure.'),
    (44, 'Civil Engineer', 'Design and oversee construction of infrastructure like roads, bridges, and water systems.'),
    (45, 'Environmental Scientist', 'Study the environment and develop solutions to environmental problems like pollution and climate change.'),
    (46, 'Chef / Culinary Professional', 'Create dishes and menus, manage kitchen operations, and deliver exceptional dining experiences.'),
    (47, 'Landscape Architect', 'Design outdoor spaces including parks, campuses, and residential areas that blend aesthetics with ecology.'),
    (48, 'Automotive Technician', 'Diagnose, repair, and maintain vehicles using diagnostic tools and mechanical expertise.'),
    (49, 'Mechanical Engineer', 'Design, develop, and test mechanical devices and systems from engines to manufacturing equipment.'),
    (50, 'Construction Manager', 'Plan and oversee construction projects, managing budgets, timelines, and subcontractors.'),
    (51, 'Social Worker', 'Help individuals and families navigate social, emotional, and financial challenges.'),
    (52, 'Nonprofit Manager', 'Lead a mission-driven organization, managing programs, fundraising, and community partnerships.'),
    (53, 'Urban Planner', 'Develop plans and programs for land use, community development, and urban revitalization.'),
    (54, 'Lawyer', 'Advise and represent clients in legal matters, from contracts and litigation to criminal defense.'),
    (55, 'Policy Analyst', 'Research and evaluate public policies, propose solutions, and advise government leaders.'),
    (56, 'Police Officer', 'Protect communities by enforcing laws, responding to emergencies, and maintaining public safety.'),
    (57, 'Firefighter / EMT', 'Respond to emergencies, fight fires, and provide medical assistance in life-threatening situations.'),
    (58, 'Research Scientist', 'Conduct original research to advance knowledge in biology, chemistry, physics, or another scientific field.'),
    (59, 'Lab Technician', 'Support scientific research by running experiments, maintaining equipment, and recording data.'),
    (60, 'Statistician', 'Apply mathematical and statistical methods to analyze data and solve real-world problems.'),
    (61, 'Epidemiologist', 'Study disease patterns in populations to prevent outbreaks and improve public health.'),
    (62, 'Journalist / Reporter', 'Research and report on news, events, and issues to inform the public.'),
    (63, 'Public Relations Specialist', 'Manage an organization''s public image through media relations, communications, and crisis management.'),
    (64, 'Social Media Manager', 'Create and manage social media content and strategy to grow audiences and build brand engagement.'),
    (65, 'Pilot', 'Operate aircraft to transport passengers or cargo safely and efficiently.'),
    (66, 'Flight Attendant', 'Ensure passenger safety and comfort during flights while providing excellent customer service.')
)
insert into career_profiles (
  id,
  title,
  description,
  openness,
  conscientiousness,
  extraversion,
  agreeableness,
  emotional_stability,
  realistic,
  investigative,
  artistic,
  social,
  enterprising,
  conventional,
  autonomy,
  security,
  challenge,
  service,
  work_life_balance,
  pace,
  collaboration,
  structure
)
select
  id,
  title,
  description,
  50, 50, 50, 50, 50,
  50, 50, 50, 50, 50, 50,
  50, 50, 50, 50, 50,
  50, 50, 50
from careers
on conflict (id) do nothing;

-- =============================================================
-- App seed data (ported from legacy SQLite seed)
-- =============================================================

-- Users
insert into "Users" ("Email", "PasswordHash", "CreatedAt") values
    ('sarah.chen@example.com',   null, '2025-01-10 08:00:00'),
    ('marcus.j@example.com',     null, '2025-01-12 09:15:00'),
    ('emily.rodriguez@example.com', null, '2025-01-15 11:30:00'),
    ('david.kim@example.com',    null, '2025-01-18 14:00:00'),
    ('aisha.patel@example.com',  null, '2025-01-20 16:45:00')
on conflict ("Email") do nothing;

-- Applicants
insert into "Applicants" ("UserId", "Name", "Initials", "AvatarColor", "Bio", "ResumeFitPercent", "PersonalityFitPercent", "Skills", "IsRecommended", "Title") values
    (1, 'Sarah Chen',     'SC', '#E67E22', 'Senior UX designer passionate about human-centered design.',     94, 91, 'UX Design,Figma,User Research,Prototyping',           1, 'Senior UX Designer'),
    (2, 'Marcus Johnson', 'MJ', '#3498DB', 'Product manager with 8 years of agile and SaaS experience.',    89, 87, 'Product Strategy,Agile,Data Analysis,Leadership',     1, 'Product Manager'),
    (3, 'Emily Rodriguez','ER', '#2ECC71', 'Data scientist specializing in ML models and predictive analytics.', 92, 85, 'Python,TensorFlow,SQL,Statistics',               1, 'Data Scientist'),
    (4, 'David Kim',      'DK', '#9B59B6', 'Full stack developer focused on React and Node.js ecosystems.',  88, 90, 'React,TypeScript,Node.js,GraphQL',                    1, 'Full Stack Developer'),
    (5, 'Aisha Patel',    'AP', '#E74C3C', 'Community builder with a background in social media strategy.',  91, 88, 'Content Strategy,Social Media,Community Building,Events', 1, 'Community Manager')
on conflict do nothing;

-- Jobs
insert into "Jobs" ("Title", "Company", "LogoEmoji", "Location", "Salary", "Type", "Description", "PersonalityType", "FitScore", "FitLevel", "FitReason", "Tags", "PostedDaysAgo") values
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
     'React,TypeScript,CSS,Frontend', 1)
on conflict do nothing;

-- QuizQuestions
insert into "QuizQuestions" ("QuestionText") values
    ('When starting a new project, what excites you most?'),
    ('How do you handle a stressful deadline?'),
    ('What kind of work environment do you prefer?'),
    ('When receiving critical feedback, you typically...'),
    ('What motivates you most at work?')
on conflict do nothing;

-- QuizOptions (QuestionId 1)
insert into "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") values
    (1, 'Exploring creative possibilities and brainstorming ideas', 'openness',          3),
    (1, 'Creating a detailed plan and timeline',                    'conscientiousness', 3),
    (1, 'Collaborating with the team and assigning roles',          'extraversion',      3),
    (1, 'Understanding how it will help others',                    'agreeableness',     3)
on conflict do nothing;

-- QuizOptions (QuestionId 2)
insert into "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") values
    (2, 'Stay calm and adapt as needed',             'emotionalStability', 3),
    (2, 'Break it down into manageable chunks',      'conscientiousness',  3),
    (2, 'Rally the team for a group push',           'extraversion',       3),
    (2, 'Find an innovative shortcut',               'openness',           3)
on conflict do nothing;

-- QuizOptions (QuestionId 3)
insert into "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") values
    (3, 'Open office with lots of interaction',  'extraversion',      3),
    (3, 'Quiet space for deep focused work',     'conscientiousness', 2),
    (3, 'Flexible and ever-changing',            'openness',          3),
    (3, 'Supportive and team-oriented',          'agreeableness',     3)
on conflict do nothing;

-- QuizOptions (QuestionId 4)
insert into "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") values
    (4, 'Take it in stride and use it to improve',         'emotionalStability', 3),
    (4, 'Analyze it carefully and create an action plan',  'conscientiousness',  3),
    (4, 'Discuss it openly with the feedback giver',       'extraversion',       2),
    (4, 'Consider how to use it to help the whole team',   'agreeableness',      3)
on conflict do nothing;

-- QuizOptions (QuestionId 5)
insert into "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") values
    (5, 'Learning new skills and technologies',     'openness',          3),
    (5, 'Achieving measurable goals and milestones','conscientiousness', 3),
    (5, 'Building relationships and networking',    'extraversion',      3),
    (5, 'Maintaining balance and inner peace',      'emotionalStability',3)
on conflict do nothing;

-- JobTags (normalized tags for the 5 seeded jobs)
insert into "JobTags" ("JobId", "TagName") values
    (1, 'Design'), (1, 'UX'), (1, 'Creative'), (1, 'Remote-friendly'),
    (2, 'Product'), (2, 'Leadership'), (2, 'Strategy'), (2, 'Agile'),
    (3, 'Data'), (3, 'Python'), (3, 'Machine Learning'), (3, 'Analytics'),
    (4, 'Community'), (4, 'Social Media'), (4, 'Marketing'), (4, 'Events'),
    (5, 'React'), (5, 'TypeScript'), (5, 'CSS'), (5, 'Frontend')
on conflict do nothing;

-- QuizResults (sample saved results)
insert into "QuizResults" ("ApplicantId", "Openness", "Conscientiousness", "Extraversion", "Agreeableness", "EmotionalStability", "DominantTrait", "MotivationType", "CreatedAt") values
    (1, 88, 65, 60, 72, 68, 'openness',          'The Innovator',  '2025-01-10 10:00:00'),
    (2, 60, 90, 75, 65, 80, 'conscientiousness', 'The Achiever',   '2025-01-12 11:00:00'),
    (3, 70, 85, 55, 60, 78, 'conscientiousness', 'The Achiever',   '2025-01-15 12:00:00'),
    (4, 75, 70, 80, 65, 72, 'extraversion',      'The Connector',  '2025-01-18 14:30:00'),
    (5, 65, 60, 85, 88, 70, 'agreeableness',     'The Harmonizer', '2025-01-20 17:00:00')
on conflict do nothing;

-- SavedJobs (sample bookmarks)
insert into "SavedJobs" ("ApplicantId", "JobId", "SavedAt") values
    (1, 1, '2025-01-11 09:00:00'),
    (1, 5, '2025-01-11 09:05:00'),
    (2, 2, '2025-01-13 10:00:00'),
    (3, 3, '2025-01-16 08:30:00'),
    (4, 5, '2025-01-19 15:00:00')
on conflict do nothing;

