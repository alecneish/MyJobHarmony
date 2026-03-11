export interface QuizOption {
  id: number;
  questionId: number;
  label: string;
  trait: string;
  weight: number;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: QuizOption[];
}

export interface Job {
  id: number;
  title: string;
  company: string;
  logoEmoji: string;
  location: string;
  salary: string;
  type: string;
  description?: string;
  personalityType?: string;
  fitScore: number;
  fitLevel: string;
  fitReason: string;
  tags: string[];
  postedDaysAgo: number;
}

export interface Applicant {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  bio?: string;
  resumeUrl?: string;
  resumeFitPercent: number;
  personalityFitPercent: number;
  skills: string[];
  isRecommended: boolean;
  title: string;
}

export interface QuizResultDto {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  emotionalStability: number;
  dominantTrait: string;
  motivationType: string;
}

export interface PersonalityResult {
  motivationType: string;
  motivationDescription: string;
  motivationIcon: string;
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  emotionalStability: number;
}
