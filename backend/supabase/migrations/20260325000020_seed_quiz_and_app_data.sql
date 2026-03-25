-- Seed data migration for production: career_profiles, QuizQuestions, QuizOptions, and app data.
-- This is idempotent — safe to run multiple times.

-- ── Career Profiles ──
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
insert into career_profiles (id, title, description, openness, conscientiousness, extraversion, agreeableness, emotional_stability, realistic, investigative, artistic, social, enterprising, conventional, autonomy, security, challenge, service, work_life_balance, pace, collaboration, structure)
select id, title, description, 50,50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50, 50,50,50
from careers
on conflict (id) do nothing;

-- ── Quiz Questions ──
insert into "QuizQuestions"
  ("Id", "QuestionText", "Dimension", "Subdimension", "Section", "SectionOrder", "QuestionFormat", "IsReverseScored", "Weight", "Tier")
values
  (1, 'I enjoy exploring new ideas, even if they seem impractical at first.', 'Openness', 'OpennessToIdeas', 'Your Personality', 1, 'Likert', false, 1.0, 'Free'),
  (2, 'I prefer sticking with what I know rather than trying unfamiliar approaches.', 'Openness', 'OpennessToIdeas', 'Your Personality', 2, 'Likert', true, 1.0, 'Free'),
  (3, 'I am drawn to art, music, or creative expression.', 'Openness', 'Aesthetics', 'Your Personality', 3, 'Likert', false, 1.0, 'Premium'),
  (4, 'I enjoy imagining how things could be different from how they are now.', 'Openness', 'Imagination', 'Your Personality', 4, 'Likert', false, 1.0, 'Premium'),
  (5, 'I set high standards for myself and work hard to meet them.', 'Conscientiousness', 'AchievementStriving', 'Your Personality', 5, 'Likert', false, 1.0, 'Free'),
  (6, 'I tend to leave tasks unfinished when something more interesting comes along.', 'Conscientiousness', 'SelfDiscipline', 'Your Personality', 6, 'Likert', true, 1.0, 'Free'),
  (7, 'I like to plan things out in advance rather than being spontaneous.', 'Conscientiousness', 'Orderliness', 'Your Personality', 7, 'Likert', false, 1.0, 'Premium'),
  (8, 'When I commit to something, I follow through no matter what.', 'Conscientiousness', 'Dutifulness', 'Your Personality', 8, 'Likert', false, 1.0, 'Premium'),
  (9, 'I feel energized when I spend time around other people.', 'Extraversion', 'Warmth', 'Your Personality', 9, 'Likert', false, 1.0, 'Free'),
  (10, 'I am comfortable taking charge and directing a group.', 'Extraversion', 'Assertiveness', 'Your Personality', 10, 'Likert', false, 1.0, 'Free'),
  (11, 'I prefer quiet, solitary activities over busy social settings.', 'Extraversion', 'Gregariousness', 'Your Personality', 11, 'Likert', true, 1.0, 'Premium'),
  (12, 'I seek out exciting experiences and enjoy a fast-paced life.', 'Extraversion', 'ExcitementSeeking', 'Your Personality', 12, 'Likert', false, 1.0, 'Premium'),
  (13, 'I generally trust other people''s intentions.', 'Agreeableness', 'Trust', 'Your Personality', 13, 'Likert', false, 1.0, 'Free'),
  (14, 'I prioritize harmony in my relationships, even if it means compromising.', 'Agreeableness', 'Compliance', 'Your Personality', 14, 'Likert', false, 1.0, 'Free'),
  (15, 'I find it easy to see things from other people''s perspectives.', 'Agreeableness', 'Tendermindedness', 'Your Personality', 15, 'Likert', false, 1.0, 'Premium'),
  (16, 'I would rather compete and win than cooperate and share credit.', 'Agreeableness', 'Modesty', 'Your Personality', 16, 'Likert', true, 1.0, 'Premium'),
  (17, 'I stay calm and collected even when things go wrong.', 'EmotionalStability', 'Anxiety', 'Your Personality', 17, 'Likert', false, 1.0, 'Free'),
  (18, 'I often worry about things that might go wrong in the future.', 'EmotionalStability', 'Anxiety', 'Your Personality', 18, 'Likert', true, 1.0, 'Free'),
  (19, 'I bounce back quickly from setbacks and disappointments.', 'EmotionalStability', 'Vulnerability', 'Your Personality', 19, 'Likert', false, 1.0, 'Premium'),
  (20, 'Small frustrations can throw off my whole day.', 'EmotionalStability', 'AngryHostility', 'Your Personality', 20, 'Likert', true, 1.0, 'Premium'),
  (21, 'Building, repairing, or working with my hands on physical projects.', 'Realistic', '', 'Your Interests', 1, 'Interest', false, 1.0, 'Free'),
  (22, 'Operating tools, machinery, or technical equipment.', 'Realistic', '', 'Your Interests', 2, 'Interest', false, 1.0, 'Free'),
  (23, 'Working outdoors in nature or on physical, hands-on tasks.', 'Realistic', '', 'Your Interests', 3, 'Interest', false, 1.0, 'Premium'),
  (24, 'Researching a complex problem to understand how something works.', 'Investigative', '', 'Your Interests', 4, 'Interest', false, 1.0, 'Free'),
  (25, 'Analyzing data or running experiments to test a hypothesis.', 'Investigative', '', 'Your Interests', 5, 'Interest', false, 1.0, 'Free'),
  (26, 'Reading academic papers or deep-dive articles to learn something new.', 'Investigative', '', 'Your Interests', 6, 'Interest', false, 1.0, 'Premium'),
  (27, 'Designing something visually appealing — a layout, outfit, or space.', 'Artistic', '', 'Your Interests', 7, 'Interest', false, 1.0, 'Free'),
  (28, 'Writing, composing, or creating original content.', 'Artistic', '', 'Your Interests', 8, 'Interest', false, 1.0, 'Free'),
  (29, 'Performing, presenting, or expressing ideas in front of an audience.', 'Artistic', '', 'Your Interests', 9, 'Interest', false, 1.0, 'Premium'),
  (30, 'Helping someone work through a personal challenge or difficult decision.', 'Social', '', 'Your Interests', 10, 'Interest', false, 1.0, 'Free'),
  (31, 'Teaching or mentoring someone to help them grow.', 'Social', '', 'Your Interests', 11, 'Interest', false, 1.0, 'Free'),
  (32, 'Volunteering for a cause that helps people in my community.', 'Social', '', 'Your Interests', 12, 'Interest', false, 1.0, 'Premium'),
  (33, 'Persuading or negotiating to close a deal or win someone over.', 'Enterprising', '', 'Your Interests', 13, 'Interest', false, 1.0, 'Free'),
  (34, 'Leading a team or project to achieve an ambitious goal.', 'Enterprising', '', 'Your Interests', 14, 'Interest', false, 1.0, 'Free'),
  (35, 'Starting a business or launching a new initiative from scratch.', 'Enterprising', '', 'Your Interests', 15, 'Interest', false, 1.0, 'Premium'),
  (36, 'Organizing files, data, or systems so everything runs smoothly.', 'Conventional', '', 'Your Interests', 16, 'Interest', false, 1.0, 'Free'),
  (37, 'Following detailed procedures to ensure accuracy and compliance.', 'Conventional', '', 'Your Interests', 17, 'Interest', false, 1.0, 'Free'),
  (38, 'Managing budgets, spreadsheets, or financial records.', 'Conventional', '', 'Your Interests', 18, 'Interest', false, 1.0, 'Premium'),
  (39, 'Having the freedom to decide how, when, and where I do my work matters more to me than a high salary.', 'Autonomy', '', 'What Drives You', 1, 'Likert', false, 1.0, 'Free'),
  (40, 'I value job stability and a predictable career path over risky but exciting opportunities.', 'Security', '', 'What Drives You', 2, 'Likert', false, 1.0, 'Free'),
  (41, 'I am at my best when I am tackling difficult problems that push my abilities.', 'Challenge', '', 'What Drives You', 3, 'Likert', false, 1.0, 'Free'),
  (42, 'Making a positive difference in other people''s lives is a central goal of my career.', 'Service', '', 'What Drives You', 4, 'Likert', false, 1.0, 'Free'),
  (43, 'Maintaining a healthy balance between my work and personal life is non-negotiable for me.', 'WorkLifeBalance', '', 'What Drives You', 5, 'Likert', false, 1.0, 'Free'),
  (44, 'I want to become a deep expert in my specific field or craft.', 'Challenge', 'TechnicalCompetence', 'What Drives You', 6, 'Likert', false, 1.0, 'Premium'),
  (45, 'I aspire to manage people and be responsible for an organization''s results.', 'Enterprising', 'Management', 'What Drives You', 7, 'Likert', false, 1.0, 'Premium'),
  (46, 'I dream of building something of my own — a company, product, or brand.', 'Autonomy', 'Entrepreneurship', 'What Drives You', 8, 'Likert', false, 1.0, 'Premium'),
  (47, 'I would sacrifice pay or prestige if it meant my work truly helped others.', 'Service', 'Dedication', 'What Drives You', 9, 'Likert', false, 1.0, 'Premium'),
  (48, 'I feel restless if my job does not constantly challenge me with new problems.', 'Challenge', 'PureChallenge', 'What Drives You', 10, 'Likert', false, 1.0, 'Premium'),
  (49, 'I need to know my job is secure before I can focus on doing my best work.', 'Security', 'Stability', 'What Drives You', 11, 'Likert', false, 1.0, 'Premium'),
  (50, 'I would rather work independently, even if it means less support or resources.', 'Autonomy', 'Independence', 'What Drives You', 12, 'Likert', false, 1.0, 'Premium'),
  (51, 'I thrive in fast-paced environments where things change quickly.', 'Pace', '', 'Your Ideal Workplace', 1, 'Likert', false, 1.0, 'Free'),
  (52, 'I do my best work as part of a close-knit team rather than on my own.', 'Collaboration', '', 'Your Ideal Workplace', 2, 'Likert', false, 1.0, 'Free'),
  (53, 'I prefer clear guidelines and structured processes over open-ended ambiguity.', 'Structure', '', 'Your Ideal Workplace', 3, 'Likert', false, 1.0, 'Free'),
  (54, 'I strongly prefer working remotely or from home over being in an office.', 'Collaboration', 'Remote', 'Your Ideal Workplace', 4, 'Likert', false, 0.8, 'Premium'),
  (55, 'I am happiest working in a small team (under 10 people) rather than a large organization.', 'Collaboration', 'TeamSize', 'Your Ideal Workplace', 5, 'Likert', false, 0.8, 'Premium'),
  (56, 'I want frequent feedback on my performance rather than annual reviews.', 'Structure', 'Feedback', 'Your Ideal Workplace', 6, 'Likert', false, 0.8, 'Premium'),
  (57, 'I prefer a workplace focused on rapid growth over one that is stable and predictable.', 'Pace', 'Growth', 'Your Ideal Workplace', 7, 'Likert', false, 0.8, 'Premium'),
  (58, 'A casual, informal workplace culture is far more appealing to me than a formal one.', 'Structure', 'Culture', 'Your Ideal Workplace', 8, 'Likert', false, 0.8, 'Premium'),
  (59, 'When I am under stress, I tend to withdraw and avoid people.', 'EmotionalStability', 'StressWithdrawal', 'Under Pressure', 1, 'Likert', true, 0.9, 'Premium'),
  (60, 'Under pressure, I become overly cautious and have trouble making decisions.', 'EmotionalStability', 'StressCaution', 'Under Pressure', 2, 'Likert', true, 0.9, 'Premium'),
  (61, 'I tend to become more controlling and demanding when deadlines loom.', 'Agreeableness', 'StressControl', 'Under Pressure', 3, 'Likert', true, 0.9, 'Premium'),
  (62, 'When stressed, I become a perfectionist and struggle to let anything go.', 'Conscientiousness', 'StressPerfectionism', 'Under Pressure', 4, 'Likert', false, 0.9, 'Premium'),
  (63, 'I can stay focused and productive even during chaotic or high-pressure periods.', 'EmotionalStability', 'StressResilience', 'Under Pressure', 5, 'Likert', false, 0.9, 'Premium'),
  (64, 'When things go wrong at work, my first instinct is to blame others.', 'Agreeableness', 'StressBlame', 'Under Pressure', 6, 'Likert', true, 0.9, 'Premium'),
  (65, 'I feel most motivated when I have significant control over my own tasks and schedule.', 'Autonomy', 'SDTAutonomy', 'Your Needs', 1, 'Likert', false, 1.0, 'Premium'),
  (66, 'I feel stifled when someone micromanages my work.', 'Autonomy', 'SDTAutonomy', 'Your Needs', 2, 'Likert', false, 1.0, 'Premium'),
  (67, 'I need to feel like I am genuinely good at what I do to stay engaged.', 'Challenge', 'SDTCompetence', 'Your Needs', 3, 'Likert', false, 1.0, 'Premium'),
  (68, 'Learning new skills and mastering new challenges is deeply satisfying to me.', 'Challenge', 'SDTCompetence', 'Your Needs', 4, 'Likert', false, 1.0, 'Premium'),
  (69, 'Feeling connected to my coworkers is just as important as the work itself.', 'Collaboration', 'SDTRelatedness', 'Your Needs', 5, 'Likert', false, 1.0, 'Premium'),
  (70, 'I feel unfulfilled if I do not have meaningful relationships at work.', 'Collaboration', 'SDTRelatedness', 'Your Needs', 6, 'Likert', false, 1.0, 'Premium'),
  (71, 'I am satisfied with my current career direction.', 'EmotionalStability', 'CareerSatisfaction', 'Your Career Journey', 1, 'Likert', false, 0.7, 'Premium'),
  (72, 'I feel ready to make a clear decision about my next career move.', 'Conscientiousness', 'DecisionReadiness', 'Your Career Journey', 2, 'Likert', false, 0.7, 'Premium'),
  (73, 'I have maintained a consistent focus on the same long-term career goals for years.', 'Conscientiousness', 'PassionConsistency', 'Your Career Journey', 3, 'Likert', false, 0.7, 'Premium'),
  (74, 'Setbacks do not discourage me — I keep pushing toward my goals.', 'EmotionalStability', 'Perseverance', 'Your Career Journey', 4, 'Likert', false, 0.7, 'Premium'),
  (75, 'I often find myself thinking about completely changing my career path.', 'Openness', 'CareerExploration', 'Your Career Journey', 5, 'Likert', false, 0.7, 'Premium')
on conflict ("Id") do update set
  "QuestionText" = excluded."QuestionText",
  "Dimension" = excluded."Dimension",
  "Subdimension" = excluded."Subdimension",
  "Section" = excluded."Section",
  "SectionOrder" = excluded."SectionOrder",
  "QuestionFormat" = excluded."QuestionFormat",
  "IsReverseScored" = excluded."IsReverseScored",
  "Weight" = excluded."Weight",
  "Tier" = excluded."Tier";

-- ── Quiz Options ──
insert into "QuizOptions" ("QuestionId", "Label", "Trait", "Weight") values
  (1, 'Exploring creative possibilities and brainstorming ideas', 'openness', 3),
  (1, 'Creating a detailed plan and timeline', 'conscientiousness', 3),
  (1, 'Collaborating with the team and assigning roles', 'extraversion', 3),
  (1, 'Understanding how it will help others', 'agreeableness', 3),
  (2, 'Stay calm and adapt as needed', 'emotionalStability', 3),
  (2, 'Break it down into manageable chunks', 'conscientiousness', 3),
  (2, 'Rally the team for a group push', 'extraversion', 3),
  (2, 'Find an innovative shortcut', 'openness', 3),
  (3, 'Open office with lots of interaction', 'extraversion', 3),
  (3, 'Quiet space for deep focused work', 'conscientiousness', 2),
  (3, 'Flexible and ever-changing', 'openness', 3),
  (3, 'Supportive and team-oriented', 'agreeableness', 3),
  (4, 'Take it in stride and use it to improve', 'emotionalStability', 3),
  (4, 'Analyze it carefully and create an action plan', 'conscientiousness', 3),
  (4, 'Discuss it openly with the feedback giver', 'extraversion', 2),
  (4, 'Consider how to use it to help the whole team', 'agreeableness', 3),
  (5, 'Learning new skills and technologies', 'openness', 3),
  (5, 'Achieving measurable goals and milestones', 'conscientiousness', 3),
  (5, 'Building relationships and networking', 'extraversion', 3),
  (5, 'Maintaining balance and inner peace', 'emotionalStability', 3)
on conflict do nothing;

-- ── Legacy App Seed Data ──
insert into "Users" ("Email", "PasswordHash", "CreatedAt") values
  ('sarah.chen@example.com', null, '2025-01-10 08:00:00'),
  ('marcus.j@example.com', null, '2025-01-12 09:15:00'),
  ('emily.rodriguez@example.com', null, '2025-01-15 11:30:00'),
  ('david.kim@example.com', null, '2025-01-18 14:00:00'),
  ('aisha.patel@example.com', null, '2025-01-20 16:45:00')
on conflict ("Email") do nothing;

insert into "Applicants" ("Id", "UserId", "Name", "Initials", "AvatarColor", "Bio", "ResumeFitPercent", "PersonalityFitPercent", "Skills", "IsRecommended", "Title") values
  (1, 1, 'Sarah Chen', 'SC', '#E67E22', 'Senior UX designer passionate about human-centered design.', 94, 91, 'UX Design,Figma,User Research,Prototyping', 1, 'Senior UX Designer'),
  (2, 2, 'Marcus Johnson', 'MJ', '#3498DB', 'Product manager with 8 years of agile and SaaS experience.', 89, 87, 'Product Strategy,Agile,Data Analysis,Leadership', 1, 'Product Manager'),
  (3, 3, 'Emily Rodriguez', 'ER', '#2ECC71', 'Data scientist specializing in ML models and predictive analytics.', 92, 85, 'Python,TensorFlow,SQL,Statistics', 1, 'Data Scientist'),
  (4, 4, 'David Kim', 'DK', '#9B59B6', 'Full stack developer focused on React and Node.js ecosystems.', 88, 90, 'React,TypeScript,Node.js,GraphQL', 1, 'Full Stack Developer'),
  (5, 5, 'Aisha Patel', 'AP', '#E74C3C', 'Community builder with a background in social media strategy.', 91, 88, 'Content Strategy,Social Media,Community Building,Events', 1, 'Community Manager'),
  (6, null, 'James Wilson', 'JW', '#1ABC9C', null, 76, 72, 'Java,Spring Boot,Microservices,AWS', 0, 'Backend Developer'),
  (7, null, 'Lisa Zhang', 'LZ', '#F39C12', null, 81, 78, 'Marketing,SEO,Google Ads,Analytics', 0, 'Digital Marketing Specialist'),
  (8, null, 'Robert Taylor', 'RT', '#34495E', null, 73, 69, 'Project Management,Scrum,Jira,Risk Assessment', 0, 'Project Manager'),
  (9, null, 'Nina Kowalski', 'NK', '#E91E63', null, 79, 82, 'Technical Writing,API Docs,Markdown,Git', 0, 'Technical Writer'),
  (10, null, 'Carlos Mendez', 'CM', '#FF5722', null, 70, 75, 'Sales,CRM,Negotiation,Client Relations', 0, 'Business Development Rep'),
  (11, null, 'Priya Sharma', 'PS', '#8BC34A', null, 84, 80, 'UI Design,Illustration,Branding,Adobe Suite', 0, 'Visual Designer')
on conflict ("Id") do nothing;

insert into "Jobs" ("Id", "Title", "Company", "LogoEmoji", "Location", "Salary", "Type", "Description", "PersonalityType", "FitScore", "FitLevel", "FitReason", "Tags", "PostedDaysAgo") values
  (1, 'Senior UX Designer', 'DesignCraft Studio', '🎨', 'San Francisco, CA', '$120k - $160k', 'Full-time', 'Lead the UX design process for a suite of enterprise SaaS products.', 'The Innovator', 95, 'Excellent', 'Your creative thinking and openness to new ideas align perfectly with this design-focused role.', 'Design,UX,Creative,Remote-friendly', 2),
  (2, 'Product Manager', 'TechFlow Inc', '🚀', 'New York, NY', '$130k - $170k', 'Full-time', 'Own the product roadmap and drive cross-functional execution for a B2B platform.', 'The Achiever', 88, 'Great', 'Your leadership skills and structured thinking make you a strong fit for product management.', 'Product,Leadership,Strategy,Agile', 3),
  (3, 'Data Scientist', 'Analytics Pro', '📊', 'Remote', '$110k - $150k', 'Full-time', 'Build and deploy ML models that power our personalization engine.', 'The Achiever', 82, 'Great', 'Your analytical mindset and conscientiousness are ideal for data-driven decision making.', 'Data,Python,Machine Learning,Analytics', 1),
  (4, 'Community Manager', 'SocialBuzz', '🌟', 'Austin, TX', '$70k - $90k', 'Full-time', 'Grow and engage our online community across Discord, Reddit, and social media.', 'The Harmonizer', 78, 'Good', 'Your people skills and agreeableness make community building a natural strength.', 'Community,Social Media,Marketing,Events', 5),
  (5, 'Frontend Developer', 'WebWorks Agency', '💻', 'Remote', '$100k - $140k', 'Contract', 'Craft accessible, performant UI components for a portfolio of client web apps.', 'The Innovator', 91, 'Excellent', 'Your creativity and attention to detail are perfect for crafting beautiful user interfaces.', 'React,TypeScript,CSS,Frontend', 1),
  (6, 'HR Business Partner', 'PeopleFirst Corp', '🤝', 'Chicago, IL', '$90k - $120k', 'Full-time', null, null, 74, 'Good', 'Your empathy and interpersonal skills align well with human resources roles.', 'HR,People Ops,Culture,Talent', 7),
  (7, 'Technical Writer', 'DocuMentor', '✍️', 'Remote', '$80k - $110k', 'Part-time', null, null, 85, 'Great', 'Your conscientiousness and clarity of thought are key assets for technical documentation.', 'Writing,Documentation,Technical,API', 4),
  (8, 'Startup Co-Founder', 'VentureLab', '💡', 'San Francisco, CA', 'Equity-based', 'Full-time', null, null, 69, 'Moderate', 'Your openness to new experiences could thrive in a startup environment, though it requires high risk tolerance.', 'Startup,Entrepreneurship,Leadership,Innovation', 10)
on conflict ("Id") do nothing;

insert into "JobTags" ("JobId", "TagName") values
  (1, 'Design'), (1, 'UX'), (1, 'Creative'), (1, 'Remote-friendly'),
  (2, 'Product'), (2, 'Leadership'), (2, 'Strategy'), (2, 'Agile'),
  (3, 'Data'), (3, 'Python'), (3, 'Machine Learning'), (3, 'Analytics'),
  (4, 'Community'), (4, 'Social Media'), (4, 'Marketing'), (4, 'Events'),
  (5, 'React'), (5, 'TypeScript'), (5, 'CSS'), (5, 'Frontend')
on conflict do nothing;

insert into "QuizResults" ("ApplicantId", "Openness", "Conscientiousness", "Extraversion", "Agreeableness", "EmotionalStability", "DominantTrait", "MotivationType", "CreatedAt") values
  (1, 88, 65, 60, 72, 68, 'openness', 'The Innovator', '2025-01-10 10:00:00'),
  (2, 60, 90, 75, 65, 80, 'conscientiousness', 'The Achiever', '2025-01-12 11:00:00'),
  (3, 70, 85, 55, 60, 78, 'conscientiousness', 'The Achiever', '2025-01-15 12:00:00'),
  (4, 75, 70, 80, 65, 72, 'extraversion', 'The Connector', '2025-01-18 14:30:00'),
  (5, 65, 60, 85, 88, 70, 'agreeableness', 'The Harmonizer', '2025-01-20 17:00:00')
on conflict do nothing;

insert into "SavedJobs" ("ApplicantId", "JobId", "SavedAt") values
  (1, 1, '2025-01-11 09:00:00'),
  (1, 5, '2025-01-11 09:05:00'),
  (2, 2, '2025-01-13 10:00:00'),
  (3, 3, '2025-01-16 08:30:00'),
  (4, 5, '2025-01-19 15:00:00')
on conflict do nothing;
