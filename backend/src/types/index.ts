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
  location: string;
  salary: string;
  type: string;
  description?: string;
  personalityType?: string;
  applyUrl?: string;
  fitScore: number;
  fitLevel: string;
  fitReason: string;
  tags: string[];
  postedDaysAgo: number;
  targetOpenness?: number;
  targetConscientiousness?: number;
  targetExtraversion?: number;
  targetAgreeableness?: number;
  targetEmotionalStability?: number;
  targetRealistic?: number;
  targetInvestigative?: number;
  targetArtistic?: number;
  targetSocial?: number;
  targetEnterprising?: number;
  targetConventional?: number;
  targetAutonomy?: number;
  targetSecurity?: number;
  targetChallenge?: number;
  targetService?: number;
  targetWorkLifeBalance?: number;
  targetPace?: number;
  targetCollaboration?: number;
  targetStructure?: number;
}

export interface Applicant {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  bio?: string;
  resumeUrl?: string;
  location?: string;
  yearsOfExperience?: number;
  linkedinUrl?: string;
  education?: ApplicantEducationEntry[];
  workExperience?: ApplicantWorkExperienceEntry[];
  resumeFitPercent: number;
  personalityFitPercent: number;
  skills: string[];
  isRecommended: boolean;
  title: string;
}

export interface ApplicantEducationEntry {
  school: string;
  degree: string;
  fieldOfStudy?: string;
  startYear?: string;
  endYear?: string;
}

export interface ApplicantWorkExperienceEntry {
  company: string;
  title: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface ApplicantCreateDto {
  id?: number;
  name: string;
  title: string;
  bio: string;
  skills: string[];
  resumeUrl?: string;
  location?: string;
  yearsOfExperience?: number;
  linkedinUrl?: string;
  education?: ApplicantEducationEntry[];
  workExperience?: ApplicantWorkExperienceEntry[];
}

export interface ApplicantUpdateDto {
  name?: string;
  title?: string;
  bio?: string;
  skills?: string[];
  resumeUrl?: string;
  location?: string;
  yearsOfExperience?: number;
  linkedinUrl?: string;
  education?: ApplicantEducationEntry[];
  workExperience?: ApplicantWorkExperienceEntry[];
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
