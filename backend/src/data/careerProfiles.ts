import { CareerProfile } from '../types';

export function getCareerProfiles(): CareerProfile[] {
  let id = 1;
  return [
    // TECHNOLOGY
    { id: id++, title: 'Software Developer', description: 'Design, build, and maintain software applications and systems.',
      openness: 75, conscientiousness: 80, extraversion: 40, agreeableness: 55, emotionalStability: 70,
      realistic: 55, investigative: 85, artistic: 50, social: 30, enterprising: 35, conventional: 45,
      autonomy: 80, security: 60, challenge: 85, service: 40, workLifeBalance: 70,
      pace: 70, collaboration: 55, structure: 55 },

    { id: id++, title: 'Data Scientist', description: 'Analyze complex data sets to find patterns, build predictive models, and drive business decisions.',
      openness: 80, conscientiousness: 80, extraversion: 35, agreeableness: 55, emotionalStability: 70,
      realistic: 40, investigative: 95, artistic: 35, social: 30, enterprising: 40, conventional: 60,
      autonomy: 75, security: 65, challenge: 90, service: 35, workLifeBalance: 65,
      pace: 60, collaboration: 50, structure: 50 },

    { id: id++, title: 'UX Designer', description: 'Research user needs and design intuitive, delightful digital experiences.',
      openness: 90, conscientiousness: 65, extraversion: 55, agreeableness: 70, emotionalStability: 65,
      realistic: 35, investigative: 65, artistic: 90, social: 70, enterprising: 40, conventional: 30,
      autonomy: 75, security: 50, challenge: 70, service: 65, workLifeBalance: 70,
      pace: 60, collaboration: 75, structure: 40 },

    { id: id++, title: 'Cybersecurity Analyst', description: 'Protect organizations from digital threats by monitoring, detecting, and responding to security incidents.',
      openness: 65, conscientiousness: 90, extraversion: 30, agreeableness: 45, emotionalStability: 80,
      realistic: 60, investigative: 85, artistic: 20, social: 25, enterprising: 35, conventional: 70,
      autonomy: 65, security: 80, challenge: 85, service: 50, workLifeBalance: 55,
      pace: 75, collaboration: 45, structure: 75 },

    { id: id++, title: 'Product Manager', description: 'Define product vision and strategy, prioritize features, and coordinate cross-functional teams.',
      openness: 80, conscientiousness: 75, extraversion: 75, agreeableness: 65, emotionalStability: 70,
      realistic: 25, investigative: 60, artistic: 45, social: 65, enterprising: 85, conventional: 45,
      autonomy: 75, security: 55, challenge: 80, service: 55, workLifeBalance: 55,
      pace: 80, collaboration: 85, structure: 45 },

    { id: id++, title: 'DevOps Engineer', description: 'Build and maintain the infrastructure, CI/CD pipelines, and systems that keep software running reliably.',
      openness: 65, conscientiousness: 85, extraversion: 35, agreeableness: 55, emotionalStability: 75,
      realistic: 75, investigative: 80, artistic: 20, social: 25, enterprising: 35, conventional: 65,
      autonomy: 80, security: 65, challenge: 80, service: 30, workLifeBalance: 60,
      pace: 75, collaboration: 50, structure: 60 },

    { id: id++, title: 'IT Project Manager', description: 'Plan, execute, and deliver technology projects on time and within budget.',
      openness: 55, conscientiousness: 85, extraversion: 65, agreeableness: 65, emotionalStability: 75,
      realistic: 30, investigative: 45, artistic: 20, social: 60, enterprising: 75, conventional: 70,
      autonomy: 60, security: 70, challenge: 65, service: 45, workLifeBalance: 55,
      pace: 75, collaboration: 80, structure: 80 },

    { id: id++, title: 'Web Developer', description: 'Build and maintain websites and web applications using modern frameworks and technologies.',
      openness: 70, conscientiousness: 75, extraversion: 35, agreeableness: 55, emotionalStability: 70,
      realistic: 50, investigative: 75, artistic: 60, social: 25, enterprising: 35, conventional: 45,
      autonomy: 80, security: 55, challenge: 75, service: 35, workLifeBalance: 75,
      pace: 65, collaboration: 45, structure: 45 },

    { id: id++, title: 'Game Designer', description: 'Conceptualize and design video game mechanics, narratives, levels, and player experiences.',
      openness: 90, conscientiousness: 65, extraversion: 45, agreeableness: 55, emotionalStability: 60,
      realistic: 40, investigative: 60, artistic: 90, social: 40, enterprising: 45, conventional: 30,
      autonomy: 75, security: 40, challenge: 80, service: 35, workLifeBalance: 55,
      pace: 65, collaboration: 65, structure: 35 },

    // HEALTHCARE
    { id: id++, title: 'Registered Nurse', description: 'Provide direct patient care, administer treatments, and coordinate with healthcare teams.',
      openness: 55, conscientiousness: 80, extraversion: 65, agreeableness: 85, emotionalStability: 70,
      realistic: 60, investigative: 55, artistic: 20, social: 90, enterprising: 30, conventional: 50,
      autonomy: 45, security: 80, challenge: 60, service: 95, workLifeBalance: 50,
      pace: 80, collaboration: 80, structure: 75 },

    { id: id++, title: 'Physician', description: 'Diagnose illnesses, prescribe treatments, and guide patients through complex health decisions.',
      openness: 70, conscientiousness: 90, extraversion: 55, agreeableness: 70, emotionalStability: 80,
      realistic: 50, investigative: 90, artistic: 20, social: 80, enterprising: 55, conventional: 45,
      autonomy: 70, security: 75, challenge: 90, service: 90, workLifeBalance: 35,
      pace: 85, collaboration: 65, structure: 60 },

    { id: id++, title: 'Physical Therapist', description: 'Help patients recover movement and manage pain through targeted exercise and rehabilitation programs.',
      openness: 60, conscientiousness: 75, extraversion: 65, agreeableness: 80, emotionalStability: 75,
      realistic: 70, investigative: 65, artistic: 25, social: 85, enterprising: 35, conventional: 40,
      autonomy: 65, security: 70, challenge: 65, service: 90, workLifeBalance: 65,
      pace: 55, collaboration: 65, structure: 55 },

    { id: id++, title: 'Mental Health Counselor', description: 'Support individuals through emotional, behavioral, and psychological challenges using therapeutic techniques.',
      openness: 80, conscientiousness: 70, extraversion: 55, agreeableness: 85, emotionalStability: 80,
      realistic: 15, investigative: 65, artistic: 45, social: 95, enterprising: 30, conventional: 25,
      autonomy: 75, security: 55, challenge: 65, service: 95, workLifeBalance: 65,
      pace: 35, collaboration: 45, structure: 45 },

    { id: id++, title: 'Healthcare Administrator', description: 'Manage the operations of hospitals, clinics, or healthcare systems to ensure quality patient care.',
      openness: 50, conscientiousness: 85, extraversion: 65, agreeableness: 60, emotionalStability: 75,
      realistic: 20, investigative: 45, artistic: 15, social: 55, enterprising: 80, conventional: 75,
      autonomy: 55, security: 75, challenge: 65, service: 70, workLifeBalance: 50,
      pace: 70, collaboration: 75, structure: 80 },

    { id: id++, title: 'Pharmacist', description: 'Dispense medications, counsel patients on drug interactions, and ensure safe pharmaceutical care.',
      openness: 45, conscientiousness: 90, extraversion: 45, agreeableness: 70, emotionalStability: 75,
      realistic: 40, investigative: 75, artistic: 10, social: 65, enterprising: 35, conventional: 80,
      autonomy: 55, security: 85, challenge: 55, service: 80, workLifeBalance: 65,
      pace: 60, collaboration: 50, structure: 85 },

    { id: id++, title: 'Dental Hygienist', description: 'Clean teeth, examine patients for oral diseases, and provide preventive dental care.',
      openness: 40, conscientiousness: 80, extraversion: 55, agreeableness: 75, emotionalStability: 75,
      realistic: 65, investigative: 50, artistic: 15, social: 65, enterprising: 25, conventional: 65,
      autonomy: 50, security: 80, challenge: 40, service: 70, workLifeBalance: 80,
      pace: 45, collaboration: 50, structure: 75 },

    { id: id++, title: 'Veterinarian', description: 'Diagnose and treat diseases and injuries in animals, and advise pet owners on animal care.',
      openness: 65, conscientiousness: 85, extraversion: 50, agreeableness: 75, emotionalStability: 70,
      realistic: 75, investigative: 80, artistic: 15, social: 60, enterprising: 40, conventional: 45,
      autonomy: 65, security: 65, challenge: 70, service: 85, workLifeBalance: 50,
      pace: 60, collaboration: 45, structure: 55 },

    { id: id++, title: 'Personal Trainer / Fitness Coach', description: 'Design exercise programs and motivate clients to achieve their health and fitness goals.',
      openness: 60, conscientiousness: 70, extraversion: 80, agreeableness: 75, emotionalStability: 70,
      realistic: 70, investigative: 40, artistic: 20, social: 85, enterprising: 65, conventional: 25,
      autonomy: 80, security: 35, challenge: 55, service: 80, workLifeBalance: 60,
      pace: 65, collaboration: 55, structure: 30 },

    { id: id++, title: 'Psychologist', description: 'Study human behavior and mental processes, and provide therapy or conduct research.',
      openness: 85, conscientiousness: 75, extraversion: 50, agreeableness: 80, emotionalStability: 80,
      realistic: 10, investigative: 85, artistic: 35, social: 90, enterprising: 30, conventional: 30,
      autonomy: 75, security: 60, challenge: 75, service: 90, workLifeBalance: 60,
      pace: 35, collaboration: 40, structure: 40 },

    { id: id++, title: 'Occupational Therapist', description: 'Help patients develop or recover daily living and work skills after injury, illness, or disability.',
      openness: 65, conscientiousness: 75, extraversion: 60, agreeableness: 85, emotionalStability: 75,
      realistic: 55, investigative: 60, artistic: 35, social: 90, enterprising: 25, conventional: 40,
      autonomy: 60, security: 70, challenge: 60, service: 90, workLifeBalance: 65,
      pace: 45, collaboration: 60, structure: 55 },

    // BUSINESS & FINANCE
    { id: id++, title: 'Financial Analyst', description: 'Evaluate investment opportunities, analyze financial data, and advise organizations on fiscal strategy.',
      openness: 50, conscientiousness: 85, extraversion: 45, agreeableness: 50, emotionalStability: 75,
      realistic: 20, investigative: 80, artistic: 15, social: 30, enterprising: 65, conventional: 85,
      autonomy: 55, security: 75, challenge: 75, service: 25, workLifeBalance: 45,
      pace: 75, collaboration: 50, structure: 80 },

    { id: id++, title: 'Marketing Manager', description: 'Develop and execute marketing strategies to grow brand awareness and drive revenue.',
      openness: 80, conscientiousness: 70, extraversion: 80, agreeableness: 60, emotionalStability: 65,
      realistic: 15, investigative: 50, artistic: 70, social: 65, enterprising: 85, conventional: 40,
      autonomy: 70, security: 50, challenge: 75, service: 40, workLifeBalance: 50,
      pace: 80, collaboration: 75, structure: 40 },

    { id: id++, title: 'Management Consultant', description: 'Advise organizations on strategy, operations, and transformation to solve complex business problems.',
      openness: 75, conscientiousness: 85, extraversion: 70, agreeableness: 55, emotionalStability: 75,
      realistic: 15, investigative: 75, artistic: 25, social: 55, enterprising: 90, conventional: 50,
      autonomy: 65, security: 55, challenge: 90, service: 40, workLifeBalance: 30,
      pace: 90, collaboration: 70, structure: 55 },

    { id: id++, title: 'Accountant', description: 'Prepare financial records, ensure tax compliance, and provide fiscal accountability for organizations.',
      openness: 30, conscientiousness: 90, extraversion: 35, agreeableness: 60, emotionalStability: 75,
      realistic: 25, investigative: 55, artistic: 10, social: 25, enterprising: 40, conventional: 95,
      autonomy: 50, security: 90, challenge: 40, service: 30, workLifeBalance: 70,
      pace: 45, collaboration: 40, structure: 95 },

    { id: id++, title: 'Human Resources Manager', description: 'Oversee recruiting, employee relations, training, and organizational culture initiatives.',
      openness: 60, conscientiousness: 75, extraversion: 70, agreeableness: 80, emotionalStability: 70,
      realistic: 10, investigative: 40, artistic: 20, social: 85, enterprising: 65, conventional: 60,
      autonomy: 55, security: 70, challenge: 55, service: 75, workLifeBalance: 65,
      pace: 55, collaboration: 85, structure: 65 },

    { id: id++, title: 'Entrepreneur', description: 'Build and grow a business from the ground up, taking on risk and wearing many hats.',
      openness: 85, conscientiousness: 75, extraversion: 75, agreeableness: 45, emotionalStability: 70,
      realistic: 35, investigative: 55, artistic: 50, social: 50, enterprising: 95, conventional: 30,
      autonomy: 95, security: 20, challenge: 90, service: 50, workLifeBalance: 30,
      pace: 90, collaboration: 55, structure: 20 },

    { id: id++, title: 'Real Estate Agent', description: 'Help clients buy, sell, and rent properties by providing market expertise and negotiation skills.',
      openness: 55, conscientiousness: 65, extraversion: 85, agreeableness: 65, emotionalStability: 65,
      realistic: 30, investigative: 30, artistic: 30, social: 75, enterprising: 90, conventional: 45,
      autonomy: 85, security: 35, challenge: 60, service: 55, workLifeBalance: 45,
      pace: 70, collaboration: 40, structure: 25 },

    { id: id++, title: 'Supply Chain / Logistics Manager', description: 'Coordinate the flow of goods from suppliers to customers, optimizing efficiency and reducing costs.',
      openness: 45, conscientiousness: 85, extraversion: 55, agreeableness: 55, emotionalStability: 70,
      realistic: 45, investigative: 55, artistic: 10, social: 40, enterprising: 65, conventional: 80,
      autonomy: 50, security: 70, challenge: 65, service: 30, workLifeBalance: 55,
      pace: 75, collaboration: 70, structure: 80 },

    { id: id++, title: 'Event Planner', description: 'Organize and coordinate events such as conferences, weddings, and corporate gatherings.',
      openness: 70, conscientiousness: 75, extraversion: 85, agreeableness: 70, emotionalStability: 60,
      realistic: 35, investigative: 25, artistic: 65, social: 80, enterprising: 75, conventional: 50,
      autonomy: 60, security: 40, challenge: 60, service: 65, workLifeBalance: 35,
      pace: 85, collaboration: 80, structure: 50 },

    { id: id++, title: 'Sales Representative', description: 'Sell products or services to businesses or consumers through relationship-building and persuasion.',
      openness: 50, conscientiousness: 65, extraversion: 90, agreeableness: 55, emotionalStability: 65,
      realistic: 20, investigative: 25, artistic: 15, social: 70, enterprising: 95, conventional: 40,
      autonomy: 70, security: 45, challenge: 65, service: 40, workLifeBalance: 45,
      pace: 85, collaboration: 50, structure: 35 },

    // CREATIVE
    { id: id++, title: 'Graphic Designer', description: 'Create visual concepts using software or by hand to communicate ideas that inspire and inform.',
      openness: 90, conscientiousness: 60, extraversion: 40, agreeableness: 60, emotionalStability: 60,
      realistic: 40, investigative: 35, artistic: 95, social: 35, enterprising: 30, conventional: 30,
      autonomy: 80, security: 45, challenge: 65, service: 35, workLifeBalance: 70,
      pace: 55, collaboration: 50, structure: 35 },

    { id: id++, title: 'Content Writer / Copywriter', description: 'Write compelling articles, marketing copy, or content that engages audiences and drives action.',
      openness: 85, conscientiousness: 65, extraversion: 40, agreeableness: 60, emotionalStability: 60,
      realistic: 15, investigative: 55, artistic: 90, social: 45, enterprising: 45, conventional: 35,
      autonomy: 85, security: 40, challenge: 60, service: 45, workLifeBalance: 75,
      pace: 50, collaboration: 35, structure: 30 },

    { id: id++, title: 'Video Producer / Filmmaker', description: 'Plan, shoot, and edit video content for entertainment, marketing, or educational purposes.',
      openness: 90, conscientiousness: 65, extraversion: 60, agreeableness: 55, emotionalStability: 60,
      realistic: 55, investigative: 35, artistic: 95, social: 50, enterprising: 55, conventional: 25,
      autonomy: 80, security: 30, challenge: 75, service: 40, workLifeBalance: 45,
      pace: 70, collaboration: 65, structure: 25 },

    { id: id++, title: 'Architect', description: 'Design buildings and structures that are functional, safe, and aesthetically compelling.',
      openness: 85, conscientiousness: 80, extraversion: 45, agreeableness: 55, emotionalStability: 70,
      realistic: 65, investigative: 70, artistic: 90, social: 40, enterprising: 50, conventional: 50,
      autonomy: 70, security: 60, challenge: 80, service: 50, workLifeBalance: 50,
      pace: 50, collaboration: 60, structure: 55 },

    { id: id++, title: 'Interior Designer', description: 'Transform indoor spaces to be beautiful, functional, and reflective of clients\' needs.',
      openness: 85, conscientiousness: 65, extraversion: 60, agreeableness: 70, emotionalStability: 65,
      realistic: 50, investigative: 35, artistic: 90, social: 65, enterprising: 55, conventional: 35,
      autonomy: 75, security: 45, challenge: 60, service: 60, workLifeBalance: 65,
      pace: 50, collaboration: 55, structure: 35 },

    { id: id++, title: 'Musician / Composer', description: 'Create, perform, or produce music for entertainment, media, or personal expression.',
      openness: 95, conscientiousness: 55, extraversion: 55, agreeableness: 55, emotionalStability: 50,
      realistic: 40, investigative: 30, artistic: 95, social: 45, enterprising: 40, conventional: 15,
      autonomy: 90, security: 20, challenge: 70, service: 40, workLifeBalance: 50,
      pace: 45, collaboration: 40, structure: 15 },

    // EDUCATION
    { id: id++, title: 'K-12 Teacher', description: 'Educate students, develop curriculum, and foster a positive learning environment.',
      openness: 70, conscientiousness: 75, extraversion: 70, agreeableness: 80, emotionalStability: 65,
      realistic: 25, investigative: 45, artistic: 50, social: 90, enterprising: 35, conventional: 50,
      autonomy: 50, security: 75, challenge: 55, service: 90, workLifeBalance: 70,
      pace: 60, collaboration: 65, structure: 65 },

    { id: id++, title: 'College Professor', description: 'Conduct research, teach university courses, and mentor graduate students in your field of expertise.',
      openness: 90, conscientiousness: 75, extraversion: 50, agreeableness: 60, emotionalStability: 70,
      realistic: 20, investigative: 90, artistic: 45, social: 65, enterprising: 40, conventional: 35,
      autonomy: 90, security: 65, challenge: 85, service: 70, workLifeBalance: 60,
      pace: 40, collaboration: 45, structure: 35 },

    { id: id++, title: 'School Counselor', description: 'Guide students through academic planning, social challenges, and career exploration.',
      openness: 70, conscientiousness: 70, extraversion: 65, agreeableness: 85, emotionalStability: 75,
      realistic: 10, investigative: 50, artistic: 30, social: 95, enterprising: 35, conventional: 40,
      autonomy: 50, security: 70, challenge: 50, service: 95, workLifeBalance: 70,
      pace: 45, collaboration: 65, structure: 55 },

    { id: id++, title: 'Corporate Trainer', description: 'Design and deliver training programs that develop employees\' skills and improve organizational performance.',
      openness: 70, conscientiousness: 70, extraversion: 80, agreeableness: 70, emotionalStability: 70,
      realistic: 15, investigative: 45, artistic: 45, social: 80, enterprising: 65, conventional: 45,
      autonomy: 60, security: 60, challenge: 60, service: 75, workLifeBalance: 65,
      pace: 55, collaboration: 80, structure: 55 },

    { id: id++, title: 'Instructional Designer', description: 'Create effective learning experiences and educational materials using research-based design principles.',
      openness: 75, conscientiousness: 75, extraversion: 45, agreeableness: 65, emotionalStability: 70,
      realistic: 25, investigative: 65, artistic: 65, social: 60, enterprising: 35, conventional: 50,
      autonomy: 70, security: 65, challenge: 65, service: 70, workLifeBalance: 70,
      pace: 45, collaboration: 55, structure: 55 },

    { id: id++, title: 'Librarian / Information Specialist', description: 'Organize, curate, and provide access to information resources, and help patrons with research.',
      openness: 80, conscientiousness: 75, extraversion: 40, agreeableness: 75, emotionalStability: 75,
      realistic: 15, investigative: 70, artistic: 40, social: 65, enterprising: 20, conventional: 70,
      autonomy: 65, security: 75, challenge: 50, service: 75, workLifeBalance: 80,
      pace: 25, collaboration: 45, structure: 70 },

    // TRADES & HANDS-ON
    { id: id++, title: 'Electrician', description: 'Install, maintain, and repair electrical systems in buildings, factories, and infrastructure.',
      openness: 40, conscientiousness: 80, extraversion: 45, agreeableness: 55, emotionalStability: 75,
      realistic: 95, investigative: 50, artistic: 15, social: 30, enterprising: 35, conventional: 60,
      autonomy: 70, security: 80, challenge: 55, service: 40, workLifeBalance: 65,
      pace: 55, collaboration: 40, structure: 70 },

    { id: id++, title: 'Civil Engineer', description: 'Design and oversee construction of infrastructure like roads, bridges, and water systems.',
      openness: 60, conscientiousness: 85, extraversion: 45, agreeableness: 55, emotionalStability: 75,
      realistic: 80, investigative: 80, artistic: 30, social: 35, enterprising: 50, conventional: 65,
      autonomy: 55, security: 75, challenge: 75, service: 55, workLifeBalance: 60,
      pace: 50, collaboration: 60, structure: 75 },

    { id: id++, title: 'Environmental Scientist', description: 'Study the environment and develop solutions to environmental problems like pollution and climate change.',
      openness: 80, conscientiousness: 75, extraversion: 40, agreeableness: 65, emotionalStability: 70,
      realistic: 65, investigative: 90, artistic: 25, social: 50, enterprising: 30, conventional: 45,
      autonomy: 65, security: 60, challenge: 75, service: 80, workLifeBalance: 65,
      pace: 40, collaboration: 50, structure: 50 },

    { id: id++, title: 'Chef / Culinary Professional', description: 'Create dishes and menus, manage kitchen operations, and deliver exceptional dining experiences.',
      openness: 80, conscientiousness: 70, extraversion: 55, agreeableness: 50, emotionalStability: 60,
      realistic: 85, investigative: 30, artistic: 80, social: 45, enterprising: 55, conventional: 35,
      autonomy: 70, security: 35, challenge: 70, service: 55, workLifeBalance: 30,
      pace: 90, collaboration: 65, structure: 50 },

    { id: id++, title: 'Landscape Architect', description: 'Design outdoor spaces including parks, campuses, and residential areas that blend aesthetics with ecology.',
      openness: 80, conscientiousness: 70, extraversion: 45, agreeableness: 60, emotionalStability: 70,
      realistic: 70, investigative: 60, artistic: 85, social: 40, enterprising: 40, conventional: 40,
      autonomy: 70, security: 55, challenge: 65, service: 55, workLifeBalance: 65,
      pace: 40, collaboration: 50, structure: 45 },

    { id: id++, title: 'Automotive Technician', description: 'Diagnose, repair, and maintain vehicles using diagnostic tools and mechanical expertise.',
      openness: 35, conscientiousness: 75, extraversion: 40, agreeableness: 50, emotionalStability: 70,
      realistic: 95, investigative: 55, artistic: 10, social: 25, enterprising: 30, conventional: 55,
      autonomy: 65, security: 70, challenge: 55, service: 40, workLifeBalance: 65,
      pace: 55, collaboration: 35, structure: 65 },

    { id: id++, title: 'Mechanical Engineer', description: 'Design, develop, and test mechanical devices and systems from engines to manufacturing equipment.',
      openness: 65, conscientiousness: 85, extraversion: 40, agreeableness: 50, emotionalStability: 75,
      realistic: 85, investigative: 80, artistic: 25, social: 25, enterprising: 40, conventional: 60,
      autonomy: 60, security: 70, challenge: 80, service: 35, workLifeBalance: 60,
      pace: 50, collaboration: 55, structure: 70 },

    { id: id++, title: 'Construction Manager', description: 'Plan and oversee construction projects, managing budgets, timelines, and subcontractors.',
      openness: 45, conscientiousness: 85, extraversion: 65, agreeableness: 50, emotionalStability: 75,
      realistic: 80, investigative: 45, artistic: 15, social: 50, enterprising: 75, conventional: 65,
      autonomy: 60, security: 70, challenge: 65, service: 35, workLifeBalance: 45,
      pace: 75, collaboration: 70, structure: 70 },

    // PUBLIC SERVICE & LAW
    { id: id++, title: 'Social Worker', description: 'Help individuals and families navigate social, emotional, and financial challenges.',
      openness: 70, conscientiousness: 70, extraversion: 60, agreeableness: 90, emotionalStability: 70,
      realistic: 15, investigative: 45, artistic: 25, social: 95, enterprising: 30, conventional: 40,
      autonomy: 50, security: 55, challenge: 55, service: 95, workLifeBalance: 55,
      pace: 55, collaboration: 65, structure: 50 },

    { id: id++, title: 'Nonprofit Manager', description: 'Lead a mission-driven organization, managing programs, fundraising, and community partnerships.',
      openness: 70, conscientiousness: 75, extraversion: 70, agreeableness: 75, emotionalStability: 70,
      realistic: 15, investigative: 40, artistic: 30, social: 80, enterprising: 75, conventional: 45,
      autonomy: 65, security: 45, challenge: 65, service: 90, workLifeBalance: 50,
      pace: 60, collaboration: 80, structure: 45 },

    { id: id++, title: 'Urban Planner', description: 'Develop plans and programs for land use, community development, and urban revitalization.',
      openness: 75, conscientiousness: 75, extraversion: 50, agreeableness: 65, emotionalStability: 70,
      realistic: 40, investigative: 70, artistic: 55, social: 65, enterprising: 50, conventional: 55,
      autonomy: 55, security: 65, challenge: 65, service: 80, workLifeBalance: 65,
      pace: 40, collaboration: 65, structure: 60 },

    { id: id++, title: 'Lawyer', description: 'Advise and represent clients in legal matters, from contracts and litigation to criminal defense.',
      openness: 60, conscientiousness: 85, extraversion: 65, agreeableness: 40, emotionalStability: 75,
      realistic: 10, investigative: 75, artistic: 30, social: 55, enterprising: 85, conventional: 65,
      autonomy: 65, security: 65, challenge: 85, service: 55, workLifeBalance: 30,
      pace: 80, collaboration: 55, structure: 70 },

    { id: id++, title: 'Policy Analyst', description: 'Research and evaluate public policies, propose solutions, and advise government leaders.',
      openness: 75, conscientiousness: 80, extraversion: 45, agreeableness: 55, emotionalStability: 70,
      realistic: 10, investigative: 85, artistic: 25, social: 55, enterprising: 55, conventional: 65,
      autonomy: 60, security: 65, challenge: 75, service: 80, workLifeBalance: 60,
      pace: 45, collaboration: 55, structure: 65 },

    { id: id++, title: 'Police Officer', description: 'Protect communities by enforcing laws, responding to emergencies, and maintaining public safety.',
      openness: 40, conscientiousness: 80, extraversion: 60, agreeableness: 50, emotionalStability: 80,
      realistic: 70, investigative: 50, artistic: 10, social: 65, enterprising: 55, conventional: 70,
      autonomy: 40, security: 85, challenge: 65, service: 80, workLifeBalance: 40,
      pace: 80, collaboration: 65, structure: 85 },

    { id: id++, title: 'Firefighter / EMT', description: 'Respond to emergencies, fight fires, and provide medical assistance in life-threatening situations.',
      openness: 40, conscientiousness: 80, extraversion: 60, agreeableness: 65, emotionalStability: 85,
      realistic: 90, investigative: 35, artistic: 10, social: 70, enterprising: 40, conventional: 55,
      autonomy: 35, security: 80, challenge: 70, service: 90, workLifeBalance: 40,
      pace: 85, collaboration: 85, structure: 80 },

    // SCIENCE & RESEARCH
    { id: id++, title: 'Research Scientist', description: 'Conduct original research to advance knowledge in biology, chemistry, physics, or another scientific field.',
      openness: 90, conscientiousness: 80, extraversion: 35, agreeableness: 55, emotionalStability: 70,
      realistic: 50, investigative: 95, artistic: 25, social: 30, enterprising: 25, conventional: 45,
      autonomy: 80, security: 55, challenge: 90, service: 55, workLifeBalance: 55,
      pace: 35, collaboration: 45, structure: 40 },

    { id: id++, title: 'Lab Technician', description: 'Support scientific research by running experiments, maintaining equipment, and recording data.',
      openness: 55, conscientiousness: 80, extraversion: 30, agreeableness: 60, emotionalStability: 70,
      realistic: 70, investigative: 75, artistic: 10, social: 25, enterprising: 15, conventional: 70,
      autonomy: 45, security: 75, challenge: 50, service: 40, workLifeBalance: 70,
      pace: 35, collaboration: 40, structure: 80 },

    { id: id++, title: 'Statistician', description: 'Apply mathematical and statistical methods to analyze data and solve real-world problems.',
      openness: 65, conscientiousness: 85, extraversion: 30, agreeableness: 55, emotionalStability: 75,
      realistic: 25, investigative: 90, artistic: 15, social: 20, enterprising: 35, conventional: 75,
      autonomy: 70, security: 70, challenge: 80, service: 30, workLifeBalance: 70,
      pace: 40, collaboration: 40, structure: 60 },

    { id: id++, title: 'Epidemiologist', description: 'Study disease patterns in populations to prevent outbreaks and improve public health.',
      openness: 70, conscientiousness: 85, extraversion: 40, agreeableness: 65, emotionalStability: 75,
      realistic: 30, investigative: 90, artistic: 15, social: 55, enterprising: 35, conventional: 65,
      autonomy: 60, security: 70, challenge: 80, service: 85, workLifeBalance: 60,
      pace: 50, collaboration: 55, structure: 65 },

    // MEDIA & COMMUNICATIONS
    { id: id++, title: 'Journalist / Reporter', description: 'Research and report on news, events, and issues to inform the public.',
      openness: 85, conscientiousness: 70, extraversion: 65, agreeableness: 50, emotionalStability: 65,
      realistic: 20, investigative: 75, artistic: 65, social: 60, enterprising: 55, conventional: 30,
      autonomy: 80, security: 35, challenge: 75, service: 70, workLifeBalance: 40,
      pace: 85, collaboration: 45, structure: 25 },

    { id: id++, title: 'Public Relations Specialist', description: "Manage an organization's public image through media relations, communications, and crisis management.",
      openness: 70, conscientiousness: 70, extraversion: 80, agreeableness: 65, emotionalStability: 65,
      realistic: 10, investigative: 40, artistic: 55, social: 75, enterprising: 80, conventional: 40,
      autonomy: 55, security: 50, challenge: 65, service: 45, workLifeBalance: 50,
      pace: 80, collaboration: 75, structure: 40 },

    { id: id++, title: 'Social Media Manager', description: 'Create and manage social media content and strategy to grow audiences and build brand engagement.',
      openness: 80, conscientiousness: 60, extraversion: 75, agreeableness: 60, emotionalStability: 60,
      realistic: 15, investigative: 35, artistic: 75, social: 65, enterprising: 70, conventional: 35,
      autonomy: 70, security: 40, challenge: 55, service: 40, workLifeBalance: 60,
      pace: 85, collaboration: 60, structure: 30 },

    // TRANSPORTATION
    { id: id++, title: 'Pilot', description: 'Operate aircraft to transport passengers or cargo safely and efficiently.',
      openness: 50, conscientiousness: 90, extraversion: 50, agreeableness: 50, emotionalStability: 90,
      realistic: 85, investigative: 55, artistic: 10, social: 30, enterprising: 45, conventional: 70,
      autonomy: 55, security: 75, challenge: 70, service: 40, workLifeBalance: 40,
      pace: 65, collaboration: 40, structure: 90 },

    { id: id++, title: 'Flight Attendant', description: 'Ensure passenger safety and comfort during flights while providing excellent customer service.',
      openness: 60, conscientiousness: 70, extraversion: 80, agreeableness: 80, emotionalStability: 70,
      realistic: 40, investigative: 15, artistic: 20, social: 80, enterprising: 45, conventional: 55,
      autonomy: 35, security: 65, challenge: 40, service: 75, workLifeBalance: 40,
      pace: 70, collaboration: 70, structure: 75 },
  ];
}
