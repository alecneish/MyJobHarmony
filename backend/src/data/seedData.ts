import { QuizQuestion, Job, Applicant, PersonalityResult } from '../types';

export function getQuizQuestions(): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  let id = 1;

  // SECTION 1: YOUR PERSONALITY (OCEAN)
  questions.push({ id: id++, text: 'I enjoy exploring new ideas, even if they seem impractical at first.', dimension: 'Openness', subdimension: 'OpennessToIdeas', section: 'Your Personality', sectionOrder: 1, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I prefer sticking with what I know rather than trying unfamiliar approaches.', dimension: 'Openness', subdimension: 'OpennessToIdeas', section: 'Your Personality', sectionOrder: 2, questionFormat: 'Likert', isReverseScored: true, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I am drawn to art, music, or creative expression.', dimension: 'Openness', subdimension: 'Aesthetics', section: 'Your Personality', sectionOrder: 3, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I enjoy imagining how things could be different from how they are now.', dimension: 'Openness', subdimension: 'Imagination', section: 'Your Personality', sectionOrder: 4, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: 'I set high standards for myself and work hard to meet them.', dimension: 'Conscientiousness', subdimension: 'AchievementStriving', section: 'Your Personality', sectionOrder: 5, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I tend to leave tasks unfinished when something more interesting comes along.', dimension: 'Conscientiousness', subdimension: 'SelfDiscipline', section: 'Your Personality', sectionOrder: 6, questionFormat: 'Likert', isReverseScored: true, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I like to plan things out in advance rather than being spontaneous.', dimension: 'Conscientiousness', subdimension: 'Orderliness', section: 'Your Personality', sectionOrder: 7, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'When I commit to something, I follow through no matter what.', dimension: 'Conscientiousness', subdimension: 'Dutifulness', section: 'Your Personality', sectionOrder: 8, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: 'I feel energized when I spend time around other people.', dimension: 'Extraversion', subdimension: 'Warmth', section: 'Your Personality', sectionOrder: 9, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I am comfortable taking charge and directing a group.', dimension: 'Extraversion', subdimension: 'Assertiveness', section: 'Your Personality', sectionOrder: 10, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I prefer quiet, solitary activities over busy social settings.', dimension: 'Extraversion', subdimension: 'Gregariousness', section: 'Your Personality', sectionOrder: 11, questionFormat: 'Likert', isReverseScored: true, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I seek out exciting experiences and enjoy a fast-paced life.', dimension: 'Extraversion', subdimension: 'ExcitementSeeking', section: 'Your Personality', sectionOrder: 12, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: "I generally trust other people's intentions.", dimension: 'Agreeableness', subdimension: 'Trust', section: 'Your Personality', sectionOrder: 13, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I prioritize harmony in my relationships, even if it means compromising.', dimension: 'Agreeableness', subdimension: 'Compliance', section: 'Your Personality', sectionOrder: 14, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: "I find it easy to see things from other people's perspectives.", dimension: 'Agreeableness', subdimension: 'Tendermindedness', section: 'Your Personality', sectionOrder: 15, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I would rather compete and win than cooperate and share credit.', dimension: 'Agreeableness', subdimension: 'Modesty', section: 'Your Personality', sectionOrder: 16, questionFormat: 'Likert', isReverseScored: true, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: 'I stay calm and collected even when things go wrong.', dimension: 'EmotionalStability', subdimension: 'Anxiety', section: 'Your Personality', sectionOrder: 17, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I often worry about things that might go wrong in the future.', dimension: 'EmotionalStability', subdimension: 'Anxiety', section: 'Your Personality', sectionOrder: 18, questionFormat: 'Likert', isReverseScored: true, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I bounce back quickly from setbacks and disappointments.', dimension: 'EmotionalStability', subdimension: 'Vulnerability', section: 'Your Personality', sectionOrder: 19, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'Small frustrations can throw off my whole day.', dimension: 'EmotionalStability', subdimension: 'AngryHostility', section: 'Your Personality', sectionOrder: 20, questionFormat: 'Likert', isReverseScored: true, weight: 1.0, tier: 'Premium' });

  // SECTION 2: YOUR INTERESTS (RIASEC)
  questions.push({ id: id++, text: 'Building, repairing, or working with my hands on physical projects.', dimension: 'Realistic', subdimension: '', section: 'Your Interests', sectionOrder: 1, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Operating tools, machinery, or technical equipment.', dimension: 'Realistic', subdimension: '', section: 'Your Interests', sectionOrder: 2, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Working outdoors in nature or on physical, hands-on tasks.', dimension: 'Realistic', subdimension: '', section: 'Your Interests', sectionOrder: 3, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: 'Researching a complex problem to understand how something works.', dimension: 'Investigative', subdimension: '', section: 'Your Interests', sectionOrder: 4, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Analyzing data or running experiments to test a hypothesis.', dimension: 'Investigative', subdimension: '', section: 'Your Interests', sectionOrder: 5, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Reading academic papers or deep-dive articles to learn something new.', dimension: 'Investigative', subdimension: '', section: 'Your Interests', sectionOrder: 6, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: 'Designing something visually appealing — a layout, outfit, or space.', dimension: 'Artistic', subdimension: '', section: 'Your Interests', sectionOrder: 7, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Writing, composing, or creating original content.', dimension: 'Artistic', subdimension: '', section: 'Your Interests', sectionOrder: 8, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Performing, presenting, or expressing ideas in front of an audience.', dimension: 'Artistic', subdimension: '', section: 'Your Interests', sectionOrder: 9, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: 'Helping someone work through a personal challenge or difficult decision.', dimension: 'Social', subdimension: '', section: 'Your Interests', sectionOrder: 10, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Teaching or mentoring someone to help them grow.', dimension: 'Social', subdimension: '', section: 'Your Interests', sectionOrder: 11, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Volunteering for a cause that helps people in my community.', dimension: 'Social', subdimension: '', section: 'Your Interests', sectionOrder: 12, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: 'Persuading or negotiating to close a deal or win someone over.', dimension: 'Enterprising', subdimension: '', section: 'Your Interests', sectionOrder: 13, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Leading a team or project to achieve an ambitious goal.', dimension: 'Enterprising', subdimension: '', section: 'Your Interests', sectionOrder: 14, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Starting a business or launching a new initiative from scratch.', dimension: 'Enterprising', subdimension: '', section: 'Your Interests', sectionOrder: 15, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  questions.push({ id: id++, text: 'Organizing files, data, or systems so everything runs smoothly.', dimension: 'Conventional', subdimension: '', section: 'Your Interests', sectionOrder: 16, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Following detailed procedures to ensure accuracy and compliance.', dimension: 'Conventional', subdimension: '', section: 'Your Interests', sectionOrder: 17, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Managing budgets, spreadsheets, or financial records.', dimension: 'Conventional', subdimension: '', section: 'Your Interests', sectionOrder: 18, questionFormat: 'Interest', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  // SECTION 3: WHAT DRIVES YOU (Work Values)
  questions.push({ id: id++, text: 'Having the freedom to decide how, when, and where I do my work matters more to me than a high salary.', dimension: 'Autonomy', subdimension: '', section: 'What Drives You', sectionOrder: 1, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I value job stability and a predictable career path over risky but exciting opportunities.', dimension: 'Security', subdimension: '', section: 'What Drives You', sectionOrder: 2, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I am at my best when I am tackling difficult problems that push my abilities.', dimension: 'Challenge', subdimension: '', section: 'What Drives You', sectionOrder: 3, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: "Making a positive difference in other people's lives is a central goal of my career.", dimension: 'Service', subdimension: '', section: 'What Drives You', sectionOrder: 4, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'Maintaining a healthy balance between my work and personal life is non-negotiable for me.', dimension: 'WorkLifeBalance', subdimension: '', section: 'What Drives You', sectionOrder: 5, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });

  questions.push({ id: id++, text: 'I want to become a deep expert in my specific field or craft.', dimension: 'Challenge', subdimension: 'TechnicalCompetence', section: 'What Drives You', sectionOrder: 6, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: "I aspire to manage people and be responsible for an organization's results.", dimension: 'Enterprising', subdimension: 'Management', section: 'What Drives You', sectionOrder: 7, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I dream of building something of my own — a company, product, or brand.', dimension: 'Autonomy', subdimension: 'Entrepreneurship', section: 'What Drives You', sectionOrder: 8, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I would sacrifice pay or prestige if it meant my work truly helped others.', dimension: 'Service', subdimension: 'Dedication', section: 'What Drives You', sectionOrder: 9, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I feel restless if my job does not constantly challenge me with new problems.', dimension: 'Challenge', subdimension: 'PureChallenge', section: 'What Drives You', sectionOrder: 10, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I need to know my job is secure before I can focus on doing my best work.', dimension: 'Security', subdimension: 'Stability', section: 'What Drives You', sectionOrder: 11, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I would rather work independently, even if it means less support or resources.', dimension: 'Autonomy', subdimension: 'Independence', section: 'What Drives You', sectionOrder: 12, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  // SECTION 4: YOUR IDEAL WORKPLACE (Work Environment)
  questions.push({ id: id++, text: 'I thrive in fast-paced environments where things change quickly.', dimension: 'Pace', subdimension: '', section: 'Your Ideal Workplace', sectionOrder: 1, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I do my best work as part of a close-knit team rather than on my own.', dimension: 'Collaboration', subdimension: '', section: 'Your Ideal Workplace', sectionOrder: 2, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });
  questions.push({ id: id++, text: 'I prefer clear guidelines and structured processes over open-ended ambiguity.', dimension: 'Structure', subdimension: '', section: 'Your Ideal Workplace', sectionOrder: 3, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Free' });

  questions.push({ id: id++, text: 'I strongly prefer working remotely or from home over being in an office.', dimension: 'Collaboration', subdimension: 'Remote', section: 'Your Ideal Workplace', sectionOrder: 4, questionFormat: 'Likert', isReverseScored: false, weight: 0.8, tier: 'Premium' });
  questions.push({ id: id++, text: 'I am happiest working in a small team (under 10 people) rather than a large organization.', dimension: 'Collaboration', subdimension: 'TeamSize', section: 'Your Ideal Workplace', sectionOrder: 5, questionFormat: 'Likert', isReverseScored: false, weight: 0.8, tier: 'Premium' });
  questions.push({ id: id++, text: 'I want frequent feedback on my performance rather than annual reviews.', dimension: 'Structure', subdimension: 'Feedback', section: 'Your Ideal Workplace', sectionOrder: 6, questionFormat: 'Likert', isReverseScored: false, weight: 0.8, tier: 'Premium' });
  questions.push({ id: id++, text: 'I prefer a workplace focused on rapid growth over one that is stable and predictable.', dimension: 'Pace', subdimension: 'Growth', section: 'Your Ideal Workplace', sectionOrder: 7, questionFormat: 'Likert', isReverseScored: false, weight: 0.8, tier: 'Premium' });
  questions.push({ id: id++, text: 'A casual, informal workplace culture is far more appealing to me than a formal one.', dimension: 'Structure', subdimension: 'Culture', section: 'Your Ideal Workplace', sectionOrder: 8, questionFormat: 'Likert', isReverseScored: false, weight: 0.8, tier: 'Premium' });

  // SECTION 5: UNDER PRESSURE (Premium)
  questions.push({ id: id++, text: 'When I am under stress, I tend to withdraw and avoid people.', dimension: 'EmotionalStability', subdimension: 'StressWithdrawal', section: 'Under Pressure', sectionOrder: 1, questionFormat: 'Likert', isReverseScored: true, weight: 0.9, tier: 'Premium' });
  questions.push({ id: id++, text: 'Under pressure, I become overly cautious and have trouble making decisions.', dimension: 'EmotionalStability', subdimension: 'StressCaution', section: 'Under Pressure', sectionOrder: 2, questionFormat: 'Likert', isReverseScored: true, weight: 0.9, tier: 'Premium' });
  questions.push({ id: id++, text: 'I tend to become more controlling and demanding when deadlines loom.', dimension: 'Agreeableness', subdimension: 'StressControl', section: 'Under Pressure', sectionOrder: 3, questionFormat: 'Likert', isReverseScored: true, weight: 0.9, tier: 'Premium' });
  questions.push({ id: id++, text: 'When stressed, I become a perfectionist and struggle to let anything go.', dimension: 'Conscientiousness', subdimension: 'StressPerfectionism', section: 'Under Pressure', sectionOrder: 4, questionFormat: 'Likert', isReverseScored: false, weight: 0.9, tier: 'Premium' });
  questions.push({ id: id++, text: 'I can stay focused and productive even during chaotic or high-pressure periods.', dimension: 'EmotionalStability', subdimension: 'StressResilience', section: 'Under Pressure', sectionOrder: 5, questionFormat: 'Likert', isReverseScored: false, weight: 0.9, tier: 'Premium' });
  questions.push({ id: id++, text: 'When things go wrong at work, my first instinct is to blame others.', dimension: 'Agreeableness', subdimension: 'StressBlame', section: 'Under Pressure', sectionOrder: 6, questionFormat: 'Likert', isReverseScored: true, weight: 0.9, tier: 'Premium' });

  // SECTION 6: YOUR NEEDS (SDT — Premium)
  questions.push({ id: id++, text: 'I feel most motivated when I have significant control over my own tasks and schedule.', dimension: 'Autonomy', subdimension: 'SDTAutonomy', section: 'Your Needs', sectionOrder: 1, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I feel stifled when someone micromanages my work.', dimension: 'Autonomy', subdimension: 'SDTAutonomy', section: 'Your Needs', sectionOrder: 2, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I need to feel like I am genuinely good at what I do to stay engaged.', dimension: 'Challenge', subdimension: 'SDTCompetence', section: 'Your Needs', sectionOrder: 3, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'Learning new skills and mastering new challenges is deeply satisfying to me.', dimension: 'Challenge', subdimension: 'SDTCompetence', section: 'Your Needs', sectionOrder: 4, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'Feeling connected to my coworkers is just as important as the work itself.', dimension: 'Collaboration', subdimension: 'SDTRelatedness', section: 'Your Needs', sectionOrder: 5, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });
  questions.push({ id: id++, text: 'I feel unfulfilled if I do not have meaningful relationships at work.', dimension: 'Collaboration', subdimension: 'SDTRelatedness', section: 'Your Needs', sectionOrder: 6, questionFormat: 'Likert', isReverseScored: false, weight: 1.0, tier: 'Premium' });

  // SECTION 7: YOUR CAREER JOURNEY (Premium)
  questions.push({ id: id++, text: 'I am satisfied with my current career direction.', dimension: 'EmotionalStability', subdimension: 'CareerSatisfaction', section: 'Your Career Journey', sectionOrder: 1, questionFormat: 'Likert', isReverseScored: false, weight: 0.7, tier: 'Premium' });
  questions.push({ id: id++, text: 'I feel ready to make a clear decision about my next career move.', dimension: 'Conscientiousness', subdimension: 'DecisionReadiness', section: 'Your Career Journey', sectionOrder: 2, questionFormat: 'Likert', isReverseScored: false, weight: 0.7, tier: 'Premium' });
  questions.push({ id: id++, text: 'I have maintained a consistent focus on the same long-term career goals for years.', dimension: 'Conscientiousness', subdimension: 'PassionConsistency', section: 'Your Career Journey', sectionOrder: 3, questionFormat: 'Likert', isReverseScored: false, weight: 0.7, tier: 'Premium' });
  questions.push({ id: id++, text: 'Setbacks do not discourage me — I keep pushing toward my goals.', dimension: 'EmotionalStability', subdimension: 'Perseverance', section: 'Your Career Journey', sectionOrder: 4, questionFormat: 'Likert', isReverseScored: false, weight: 0.7, tier: 'Premium' });
  questions.push({ id: id++, text: 'I often find myself thinking about completely changing my career path.', dimension: 'Openness', subdimension: 'CareerExploration', section: 'Your Career Journey', sectionOrder: 5, questionFormat: 'Likert', isReverseScored: false, weight: 0.7, tier: 'Premium' });

  return questions;
}

export function getJobs(): Job[] {
  return [
    {
      id: 1, title: 'Senior UX Designer', company: 'DesignCraft Studio',
      logoEmoji: '🎨', location: 'San Francisco, CA', salary: '$120k - $160k',
      type: 'Full-time', fitScore: 95, fitLevel: 'Excellent',
      applyUrl: 'https://example.com/jobs/senior-ux-designer',
      fitReason: 'Your creative thinking and openness to new ideas align perfectly with this design-focused role.',
      tags: ['Design', 'UX', 'Creative', 'Remote-friendly'], postedDaysAgo: 2,
      targetOpenness: 90, targetConscientiousness: 65, targetExtraversion: 55, targetAgreeableness: 70, targetEmotionalStability: 65,
      targetRealistic: 35, targetInvestigative: 65, targetArtistic: 90, targetSocial: 70, targetEnterprising: 40, targetConventional: 30,
      targetAutonomy: 75, targetSecurity: 50, targetChallenge: 70, targetService: 65, targetWorkLifeBalance: 70,
      targetPace: 60, targetCollaboration: 75, targetStructure: 40,
    },
    {
      id: 2, title: 'Product Manager', company: 'TechFlow Inc',
      logoEmoji: '🚀', location: 'New York, NY', salary: '$130k - $170k',
      type: 'Full-time', fitScore: 88, fitLevel: 'Great',
      applyUrl: 'https://example.com/jobs/product-manager',
      fitReason: 'Your leadership skills and structured thinking make you a strong fit for product management.',
      tags: ['Product', 'Leadership', 'Strategy', 'Agile'], postedDaysAgo: 3,
      targetOpenness: 80, targetConscientiousness: 75, targetExtraversion: 75, targetAgreeableness: 65, targetEmotionalStability: 70,
      targetRealistic: 25, targetInvestigative: 60, targetArtistic: 45, targetSocial: 65, targetEnterprising: 85, targetConventional: 45,
      targetAutonomy: 75, targetSecurity: 55, targetChallenge: 80, targetService: 55, targetWorkLifeBalance: 55,
      targetPace: 80, targetCollaboration: 85, targetStructure: 45,
    },
    {
      id: 3, title: 'Data Scientist', company: 'Analytics Pro',
      logoEmoji: '📊', location: 'Remote', salary: '$110k - $150k',
      type: 'Full-time', fitScore: 82, fitLevel: 'Great',
      applyUrl: 'https://example.com/jobs/data-scientist',
      fitReason: 'Your analytical mindset and conscientiousness are ideal for data-driven decision making.',
      tags: ['Data', 'Python', 'Machine Learning', 'Analytics'], postedDaysAgo: 1,
      targetOpenness: 80, targetConscientiousness: 80, targetExtraversion: 35, targetAgreeableness: 55, targetEmotionalStability: 70,
      targetRealistic: 40, targetInvestigative: 95, targetArtistic: 35, targetSocial: 30, targetEnterprising: 40, targetConventional: 60,
      targetAutonomy: 75, targetSecurity: 65, targetChallenge: 90, targetService: 35, targetWorkLifeBalance: 65,
      targetPace: 60, targetCollaboration: 50, targetStructure: 50,
    },
    {
      id: 4, title: 'Community Manager', company: 'SocialBuzz',
      logoEmoji: '🌟', location: 'Austin, TX', salary: '$70k - $90k',
      type: 'Full-time', fitScore: 78, fitLevel: 'Good',
      applyUrl: 'https://example.com/jobs/community-manager',
      fitReason: 'Your people skills and agreeableness make community building a natural strength.',
      tags: ['Community', 'Social Media', 'Marketing', 'Events'], postedDaysAgo: 5,
      targetOpenness: 70, targetConscientiousness: 65, targetExtraversion: 78, targetAgreeableness: 78, targetEmotionalStability: 65,
      targetRealistic: 15, targetInvestigative: 40, targetArtistic: 55, targetSocial: 85, targetEnterprising: 70, targetConventional: 40,
      targetAutonomy: 60, targetSecurity: 45, targetChallenge: 60, targetService: 55, targetWorkLifeBalance: 55,
      targetPace: 75, targetCollaboration: 80, targetStructure: 40,
    },
    {
      id: 5, title: 'Frontend Developer', company: 'WebWorks Agency',
      logoEmoji: '💻', location: 'Remote', salary: '$100k - $140k',
      type: 'Contract', fitScore: 91, fitLevel: 'Excellent',
      applyUrl: 'https://example.com/jobs/frontend-developer',
      fitReason: 'Your creativity and attention to detail are perfect for crafting beautiful user interfaces.',
      tags: ['React', 'TypeScript', 'CSS', 'Frontend'], postedDaysAgo: 1,
      targetOpenness: 70, targetConscientiousness: 75, targetExtraversion: 35, targetAgreeableness: 55, targetEmotionalStability: 70,
      targetRealistic: 50, targetInvestigative: 75, targetArtistic: 60, targetSocial: 25, targetEnterprising: 35, targetConventional: 45,
      targetAutonomy: 80, targetSecurity: 55, targetChallenge: 75, targetService: 35, targetWorkLifeBalance: 75,
      targetPace: 65, targetCollaboration: 45, targetStructure: 45,
    },
    {
      id: 6, title: 'HR Business Partner', company: 'PeopleFirst Corp',
      logoEmoji: '🤝', location: 'Chicago, IL', salary: '$90k - $120k',
      type: 'Full-time', fitScore: 74, fitLevel: 'Good',
      applyUrl: 'https://example.com/jobs/hr-business-partner',
      fitReason: 'Your empathy and interpersonal skills align well with human resources roles.',
      tags: ['HR', 'People Ops', 'Culture', 'Talent'], postedDaysAgo: 7,
      targetOpenness: 60, targetConscientiousness: 75, targetExtraversion: 70, targetAgreeableness: 80, targetEmotionalStability: 70,
      targetRealistic: 10, targetInvestigative: 40, targetArtistic: 20, targetSocial: 85, targetEnterprising: 65, targetConventional: 60,
      targetAutonomy: 55, targetSecurity: 70, targetChallenge: 55, targetService: 75, targetWorkLifeBalance: 65,
      targetPace: 55, targetCollaboration: 85, targetStructure: 65,
    },
    {
      id: 7, title: 'Technical Writer', company: 'DocuMentor',
      logoEmoji: '✍️', location: 'Remote', salary: '$80k - $110k',
      type: 'Part-time', fitScore: 85, fitLevel: 'Great',
      applyUrl: 'https://example.com/jobs/technical-writer',
      fitReason: 'Your conscientiousness and clarity of thought are key assets for technical documentation.',
      tags: ['Writing', 'Documentation', 'Technical', 'API'], postedDaysAgo: 4,
      targetOpenness: 85, targetConscientiousness: 65, targetExtraversion: 40, targetAgreeableness: 60, targetEmotionalStability: 60,
      targetRealistic: 15, targetInvestigative: 55, targetArtistic: 90, targetSocial: 45, targetEnterprising: 45, targetConventional: 35,
      targetAutonomy: 85, targetSecurity: 40, targetChallenge: 60, targetService: 45, targetWorkLifeBalance: 75,
      targetPace: 50, targetCollaboration: 35, targetStructure: 30,
    },
    {
      id: 8, title: 'Startup Co-Founder', company: 'VentureLab',
      logoEmoji: '💡', location: 'San Francisco, CA', salary: 'Equity-based',
      type: 'Full-time', fitScore: 69, fitLevel: 'Moderate',
      applyUrl: 'https://example.com/jobs/startup-cofounder',
      fitReason: 'Your openness to new experiences could thrive in a startup environment, though it requires high risk tolerance.',
      tags: ['Startup', 'Entrepreneurship', 'Leadership', 'Innovation'], postedDaysAgo: 10,
      targetOpenness: 85, targetConscientiousness: 75, targetExtraversion: 75, targetAgreeableness: 45, targetEmotionalStability: 70,
      targetRealistic: 35, targetInvestigative: 55, targetArtistic: 50, targetSocial: 50, targetEnterprising: 95, targetConventional: 30,
      targetAutonomy: 95, targetSecurity: 20, targetChallenge: 90, targetService: 50, targetWorkLifeBalance: 30,
      targetPace: 90, targetCollaboration: 55, targetStructure: 20,
    },
  ];
}

export function getApplicants(): Applicant[] {
  return [
    {
      id: 1, name: 'Sarah Chen', initials: 'SC', avatarColor: '#E67E22',
      resumeFitPercent: 94, personalityFitPercent: 91,
      skills: ['UX Design', 'Figma', 'User Research', 'Prototyping'],
      isRecommended: true, title: 'Senior UX Designer',
    },
    {
      id: 2, name: 'Marcus Johnson', initials: 'MJ', avatarColor: '#3498DB',
      resumeFitPercent: 89, personalityFitPercent: 87,
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Leadership'],
      isRecommended: true, title: 'Product Manager',
    },
    {
      id: 3, name: 'Emily Rodriguez', initials: 'ER', avatarColor: '#2ECC71',
      resumeFitPercent: 92, personalityFitPercent: 85,
      skills: ['Python', 'TensorFlow', 'SQL', 'Statistics'],
      isRecommended: true, title: 'Data Scientist',
    },
    {
      id: 4, name: 'David Kim', initials: 'DK', avatarColor: '#9B59B6',
      resumeFitPercent: 88, personalityFitPercent: 90,
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      isRecommended: true, title: 'Full Stack Developer',
    },
    {
      id: 5, name: 'Aisha Patel', initials: 'AP', avatarColor: '#E74C3C',
      resumeFitPercent: 91, personalityFitPercent: 88,
      skills: ['Content Strategy', 'Social Media', 'Community Building', 'Events'],
      isRecommended: true, title: 'Community Manager',
    },
    {
      id: 6, name: 'James Wilson', initials: 'JW', avatarColor: '#1ABC9C',
      resumeFitPercent: 76, personalityFitPercent: 72,
      skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
      isRecommended: false, title: 'Backend Developer',
    },
    {
      id: 7, name: 'Lisa Zhang', initials: 'LZ', avatarColor: '#F39C12',
      resumeFitPercent: 81, personalityFitPercent: 78,
      skills: ['Marketing', 'SEO', 'Google Ads', 'Analytics'],
      isRecommended: false, title: 'Digital Marketing Specialist',
    },
    {
      id: 8, name: 'Robert Taylor', initials: 'RT', avatarColor: '#34495E',
      resumeFitPercent: 73, personalityFitPercent: 69,
      skills: ['Project Management', 'Scrum', 'Jira', 'Risk Assessment'],
      isRecommended: false, title: 'Project Manager',
    },
    {
      id: 9, name: 'Nina Kowalski', initials: 'NK', avatarColor: '#E91E63',
      resumeFitPercent: 79, personalityFitPercent: 82,
      skills: ['Technical Writing', 'API Docs', 'Markdown', 'Git'],
      isRecommended: false, title: 'Technical Writer',
    },
    {
      id: 10, name: 'Carlos Mendez', initials: 'CM', avatarColor: '#FF5722',
      resumeFitPercent: 70, personalityFitPercent: 75,
      skills: ['Sales', 'CRM', 'Negotiation', 'Client Relations'],
      isRecommended: false, title: 'Business Development Rep',
    },
    {
      id: 11, name: 'Priya Sharma', initials: 'PS', avatarColor: '#8BC34A',
      resumeFitPercent: 84, personalityFitPercent: 80,
      skills: ['UI Design', 'Illustration', 'Branding', 'Adobe Suite'],
      isRecommended: false, title: 'Visual Designer',
    },
  ];
}

export function getDefaultResult(): PersonalityResult {
  return {
    motivationType: 'The Innovator',
    motivationDescription: "You thrive on creativity and new ideas. You're driven by curiosity and love exploring uncharted territory.",
    motivationIcon: '💡',
    openness: 75,
    conscientiousness: 65,
    extraversion: 60,
    agreeableness: 70,
    emotionalStability: 68,
  };
}
