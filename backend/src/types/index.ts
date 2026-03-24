export interface QuizQuestion {
  id: number;
  text: string;
  dimension: string;
  subdimension: string;
  section: string;
  sectionOrder: number;
  questionFormat: string;
  isReverseScored: boolean;
  weight: number;
  tier: string;
}

export interface QuizResponse {
  questionId: number;
  answerValue: number; // 1–5
}

export interface DimensionScore {
  dimension: string;
  subdimension: string;
  rawScore: number;
  normalizedScore: number;
}

export interface CareerProfile {
  id: number;
  title: string;
  description: string;
  // OCEAN
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  emotionalStability: number;
  // RIASEC
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
  // Values
  autonomy: number;
  security: number;
  challenge: number;
  service: number;
  workLifeBalance: number;
  // Environment
  pace: number;
  collaboration: number;
  structure: number;
}

export interface CareerMatch {
  careerProfileId: number;
  title: string;
  matchScore: number;
  rank: number;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  logoEmoji: string;
  image: string;
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
  responses: QuizResponse[];
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
