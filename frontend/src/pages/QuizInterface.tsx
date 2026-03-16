import type { Option } from '../components/questions/QuestionComponents';
import QuestionStepper, { QuestionDef } from '../components/questions/QuestionStepper';

interface QuizFormState {
  shortAnswer: string;
  longAnswer: string;
  roleType: string;
  strengths: string[];
  shift: string;
  tools: string[];
  experienceYears: number;
  salaryRange: number;
  startDate: string;
  startTime: string;
  interviewDateTime: string;
  availableMonth: string;
  availableWeek: string;
  favoriteColor: string;
  email: string;
  phone: string;
  portfolio: string;
  secretPhrase: string;
  resumeFile?: File | null;
  newsletter: boolean;
  location: string;
  city: string;
}

const initialState: QuizFormState = {
  shortAnswer: '',
  longAnswer: '',
  roleType: 'product',
  strengths: [],
  shift: 'hybrid',
  tools: [],
  experienceYears: 3,
  salaryRange: 80,
  startDate: '',
  startTime: '',
  interviewDateTime: '',
  availableMonth: '',
  availableWeek: '',
  favoriteColor: '#e67e22',
  email: '',
  phone: '',
  portfolio: '',
  secretPhrase: '',
  resumeFile: null,
  newsletter: true,
  location: 'remote',
  city: '',
};

const STRENGTH_OPTIONS = [
  'Leadership',
  'Communication',
  'Problem solving',
  'Creativity',
  'Analytical thinking',
];

const TOOL_OPTIONS = ['Figma', 'Jira', 'Notion', 'Excel', 'SQL'];
const CITY_OPTIONS: Option[] = [
  { value: 'New York', label: 'New York' },
  { value: 'San Francisco', label: 'San Francisco' },
  { value: 'London', label: 'London' },
  { value: 'Toronto', label: 'Toronto' },
  { value: 'Singapore', label: 'Singapore' },
];

const STEPPER_QUESTIONS: QuestionDef[] = [
  { id: 'shortAnswer', title: 'Short answer', type: 'text', placeholder: 'What motivates you at work?', required: true },
  { id: 'longAnswer', title: 'Long answer', type: 'textarea', placeholder: 'Share a brief story about a project you enjoyed.' },
  {
    id: 'roleType',
    title: 'Role type',
    type: 'select',
    options: [
      { value: 'product', label: 'Product' },
      { value: 'design', label: 'Design' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'operations', label: 'Operations' },
    ],
  },
  {
    id: 'strengths',
    title: 'Primary strengths',
    type: 'checkbox-chips',
    options: STRENGTH_OPTIONS.map((s) => ({ value: s, label: s })),
    helper: 'Pick one or more',
  },
  {
    id: 'shift',
    title: 'Preferred shift',
    type: 'radio-chips',
    options: ['onsite', 'remote', 'hybrid'].map((v) => ({ value: v, label: v })),
    required: true,
  },
  {
    id: 'tools',
    title: 'Daily tools',
    type: 'checkbox-chips',
    options: TOOL_OPTIONS.map((tool) => ({ value: tool, label: tool })),
  },
  {
    id: 'experienceYears',
    title: 'Years of experience',
    type: 'input',
    inputType: 'number',
    min: 0,
    max: 40,
  },
  {
    id: 'salaryRange',
    title: 'Desired salary range (k)',
    type: 'range',
    min: 40,
    max: 200,
    step: 5,
    displayValue: (v) => `$${v}k`,
  },
  { id: 'startDate', title: 'Earliest start date', type: 'input', inputType: 'date' },
  { id: 'startTime', title: 'Preferred daily start', type: 'input', inputType: 'time' },
  { id: 'interviewDateTime', title: 'Interview slot', type: 'input', inputType: 'datetime-local' },
  { id: 'availableMonth', title: 'Available month', type: 'input', inputType: 'month' },
  { id: 'availableWeek', title: 'Available week', type: 'input', inputType: 'week' },
  { id: 'email', title: 'Email', type: 'input', inputType: 'email', placeholder: 'you@example.com', required: true },
  { id: 'phone', title: 'Phone', type: 'input', inputType: 'tel', placeholder: '(555) 123-4567' },
  { id: 'portfolio', title: 'Portfolio URL', type: 'input', inputType: 'url', placeholder: 'https://your-site.com' },
  { id: 'secretPhrase', title: 'Secret phrase', type: 'input', inputType: 'password' },
  { id: 'favoriteColor', title: 'Accent color', type: 'input', inputType: 'color' },
  { id: 'city', title: 'Preferred office city', type: 'datalist', options: CITY_OPTIONS, placeholder: 'Start typing...' },
  { id: 'resumeFile', title: 'Upload resume', type: 'file', helper: '.pdf, .doc, .docx' },
  { id: 'newsletter', title: 'Send me interview prep tips', type: 'toggle' },
  {
    id: 'location',
    title: 'Location preference',
    type: 'radio-chips',
    options: [
      { value: 'remote', label: 'Remote' },
      { value: 'in-office', label: 'In-office' },
    ],
    required: true,
  },
];

export default function QuizInterface() {
  return (
    <div className="jh-quiz-lab">
      <div className="jh-section-header" style={{ marginBottom: '1rem' }}>
        <h2>Quiz Interface Shell</h2>
        <p>
          Outer interface that shows one question at a time. Swap in your own QuestionDef list and
          onComplete handler to build the real quiz.
        </p>
      </div>

      <QuestionStepper
        questions={STEPPER_QUESTIONS}
        initialAnswers={{ ...initialState } as Record<string, unknown>}
        onComplete={(answers) => console.info('Collected answers (hook up to your API):', answers)}
      />
    </div>
  );
}
