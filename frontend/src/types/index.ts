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
  resumeFitPercent: number;
  personalityFitPercent: number;
  skills: string[];
  isRecommended: boolean;
  title: string;
}

export interface QuizResults {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  emotionalStability: number;
  motivationType: string;
  motivationDescription: string;
  motivationIcon: string;
}

export interface SnackbarState {
  message: string;
  visible: boolean;
  undoFn?: () => void;
}

export interface JobsApiResponse {
  jobs: Job[];
  allTags: string[];
  allTypes: string[];
  allLocations: string[];
}

export interface RecruitApiResponse {
  recommendedApplicants: Applicant[];
  allApplicants: Applicant[];
}
