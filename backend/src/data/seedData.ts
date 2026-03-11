import { QuizQuestion, Job, Applicant, PersonalityResult } from '../types';

export function getQuizQuestions(): QuizQuestion[] {
  return [
    {
      id: 1,
      questionText: 'When starting a new project, what excites you most?',
      options: [
        { id: 1, questionId: 1, label: 'Exploring creative possibilities and brainstorming ideas', trait: 'openness', weight: 3 },
        { id: 2, questionId: 1, label: 'Creating a detailed plan and timeline', trait: 'conscientiousness', weight: 3 },
        { id: 3, questionId: 1, label: 'Collaborating with the team and assigning roles', trait: 'extraversion', weight: 3 },
        { id: 4, questionId: 1, label: 'Understanding how it will help others', trait: 'agreeableness', weight: 3 },
      ],
    },
    {
      id: 2,
      questionText: 'How do you handle a stressful deadline?',
      options: [
        { id: 5, questionId: 2, label: 'Stay calm and adapt as needed', trait: 'emotionalStability', weight: 3 },
        { id: 6, questionId: 2, label: 'Break it down into manageable chunks', trait: 'conscientiousness', weight: 3 },
        { id: 7, questionId: 2, label: 'Rally the team for a group push', trait: 'extraversion', weight: 3 },
        { id: 8, questionId: 2, label: 'Find an innovative shortcut', trait: 'openness', weight: 3 },
      ],
    },
    {
      id: 3,
      questionText: 'What kind of work environment do you prefer?',
      options: [
        { id: 9, questionId: 3, label: 'Open office with lots of interaction', trait: 'extraversion', weight: 3 },
        { id: 10, questionId: 3, label: 'Quiet space for deep focused work', trait: 'conscientiousness', weight: 2 },
        { id: 11, questionId: 3, label: 'Flexible and ever-changing', trait: 'openness', weight: 3 },
        { id: 12, questionId: 3, label: 'Supportive and team-oriented', trait: 'agreeableness', weight: 3 },
      ],
    },
    {
      id: 4,
      questionText: 'When receiving critical feedback, you typically...',
      options: [
        { id: 13, questionId: 4, label: 'Take it in stride and use it to improve', trait: 'emotionalStability', weight: 3 },
        { id: 14, questionId: 4, label: 'Analyze it carefully and create an action plan', trait: 'conscientiousness', weight: 3 },
        { id: 15, questionId: 4, label: 'Discuss it openly with the feedback giver', trait: 'extraversion', weight: 2 },
        { id: 16, questionId: 4, label: 'Consider how to use it to help the whole team', trait: 'agreeableness', weight: 3 },
      ],
    },
    {
      id: 5,
      questionText: 'What motivates you most at work?',
      options: [
        { id: 17, questionId: 5, label: 'Learning new skills and technologies', trait: 'openness', weight: 3 },
        { id: 18, questionId: 5, label: 'Achieving measurable goals and milestones', trait: 'conscientiousness', weight: 3 },
        { id: 19, questionId: 5, label: 'Building relationships and networking', trait: 'extraversion', weight: 3 },
        { id: 20, questionId: 5, label: 'Maintaining balance and inner peace', trait: 'emotionalStability', weight: 3 },
      ],
    },
    {
      id: 6,
      questionText: 'How do you approach problem-solving?',
      options: [
        { id: 21, questionId: 6, label: 'Think outside the box with unconventional ideas', trait: 'openness', weight: 3 },
        { id: 22, questionId: 6, label: 'Follow a systematic, step-by-step process', trait: 'conscientiousness', weight: 3 },
        { id: 23, questionId: 6, label: 'Brainstorm with colleagues for diverse perspectives', trait: 'extraversion', weight: 2 },
        { id: 24, questionId: 6, label: 'Focus on solutions that benefit everyone', trait: 'agreeableness', weight: 3 },
      ],
    },
    {
      id: 7,
      questionText: 'In a team conflict, you would most likely...',
      options: [
        { id: 25, questionId: 7, label: 'Mediate and find common ground', trait: 'agreeableness', weight: 3 },
        { id: 26, questionId: 7, label: 'Stay composed and objective', trait: 'emotionalStability', weight: 3 },
        { id: 27, questionId: 7, label: 'Address it head-on in a group discussion', trait: 'extraversion', weight: 3 },
        { id: 28, questionId: 7, label: 'Propose a creative compromise', trait: 'openness', weight: 2 },
      ],
    },
    {
      id: 8,
      questionText: 'What best describes your ideal career path?',
      options: [
        { id: 29, questionId: 8, label: 'Constantly evolving with new challenges', trait: 'openness', weight: 3 },
        { id: 30, questionId: 8, label: 'Steady progression with clear advancement', trait: 'conscientiousness', weight: 3 },
        { id: 31, questionId: 8, label: 'Leadership roles with high visibility', trait: 'extraversion', weight: 3 },
        { id: 32, questionId: 8, label: 'Making a meaningful impact on others\' lives', trait: 'agreeableness', weight: 3 },
      ],
    },
  ];
}

export function getJobs(): Job[] {
  return [
    {
      id: 1, title: 'Senior UX Designer', company: 'DesignCraft Studio',
      logoEmoji: '🎨', location: 'San Francisco, CA', salary: '$120k - $160k',
      type: 'Full-time', fitScore: 95, fitLevel: 'Excellent',
      fitReason: 'Your creative thinking and openness to new ideas align perfectly with this design-focused role.',
      tags: ['Design', 'UX', 'Creative', 'Remote-friendly'], postedDaysAgo: 2,
    },
    {
      id: 2, title: 'Product Manager', company: 'TechFlow Inc',
      logoEmoji: '🚀', location: 'New York, NY', salary: '$130k - $170k',
      type: 'Full-time', fitScore: 88, fitLevel: 'Great',
      fitReason: 'Your leadership skills and structured thinking make you a strong fit for product management.',
      tags: ['Product', 'Leadership', 'Strategy', 'Agile'], postedDaysAgo: 3,
    },
    {
      id: 3, title: 'Data Scientist', company: 'Analytics Pro',
      logoEmoji: '📊', location: 'Remote', salary: '$110k - $150k',
      type: 'Full-time', fitScore: 82, fitLevel: 'Great',
      fitReason: 'Your analytical mindset and conscientiousness are ideal for data-driven decision making.',
      tags: ['Data', 'Python', 'Machine Learning', 'Analytics'], postedDaysAgo: 1,
    },
    {
      id: 4, title: 'Community Manager', company: 'SocialBuzz',
      logoEmoji: '🌟', location: 'Austin, TX', salary: '$70k - $90k',
      type: 'Full-time', fitScore: 78, fitLevel: 'Good',
      fitReason: 'Your people skills and agreeableness make community building a natural strength.',
      tags: ['Community', 'Social Media', 'Marketing', 'Events'], postedDaysAgo: 5,
    },
    {
      id: 5, title: 'Frontend Developer', company: 'WebWorks Agency',
      logoEmoji: '💻', location: 'Remote', salary: '$100k - $140k',
      type: 'Contract', fitScore: 91, fitLevel: 'Excellent',
      fitReason: 'Your creativity and attention to detail are perfect for crafting beautiful user interfaces.',
      tags: ['React', 'TypeScript', 'CSS', 'Frontend'], postedDaysAgo: 1,
    },
    {
      id: 6, title: 'HR Business Partner', company: 'PeopleFirst Corp',
      logoEmoji: '🤝', location: 'Chicago, IL', salary: '$90k - $120k',
      type: 'Full-time', fitScore: 74, fitLevel: 'Good',
      fitReason: 'Your empathy and interpersonal skills align well with human resources roles.',
      tags: ['HR', 'People Ops', 'Culture', 'Talent'], postedDaysAgo: 7,
    },
    {
      id: 7, title: 'Technical Writer', company: 'DocuMentor',
      logoEmoji: '✍️', location: 'Remote', salary: '$80k - $110k',
      type: 'Part-time', fitScore: 85, fitLevel: 'Great',
      fitReason: 'Your conscientiousness and clarity of thought are key assets for technical documentation.',
      tags: ['Writing', 'Documentation', 'Technical', 'API'], postedDaysAgo: 4,
    },
    {
      id: 8, title: 'Startup Co-Founder', company: 'VentureLab',
      logoEmoji: '💡', location: 'San Francisco, CA', salary: 'Equity-based',
      type: 'Full-time', fitScore: 69, fitLevel: 'Moderate',
      fitReason: 'Your openness to new experiences could thrive in a startup environment, though it requires high risk tolerance.',
      tags: ['Startup', 'Entrepreneurship', 'Leadership', 'Innovation'], postedDaysAgo: 10,
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
