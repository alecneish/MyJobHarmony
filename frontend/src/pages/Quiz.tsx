import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QuizQuestion, QuizResults, CareerMatch } from '../types';
import { showSnackbar } from '../components/Snackbar';
import { apiClient } from '../lib/apiClient';
import { useAuth } from '../context/AuthContext';

const QUESTIONS_PER_PAGE = 10;

const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

const INTEREST_OPTIONS = [
  { value: 1, label: 'Not at all' },
  { value: 2, label: 'Slightly' },
  { value: 3, label: 'Moderately' },
  { value: 4, label: 'Very' },
  { value: 5, label: 'Extremely' },
];

const MOTIVATION_TYPES: Record<string, { type: string; description: string; icon: string }> = {
  Openness: {
    type: 'The Innovator',
    description: "You thrive on creativity and new ideas. You're driven by curiosity and love exploring uncharted territory.",
    icon: '💡',
  },
  Conscientiousness: {
    type: 'The Achiever',
    description: "You're goal-oriented and detail-driven. You find satisfaction in completing tasks with precision and excellence.",
    icon: '🎯',
  },
  Extraversion: {
    type: 'The Connector',
    description: "You're energized by people and thrive in collaborative environments. Building relationships is your superpower.",
    icon: '🤝',
  },
  Agreeableness: {
    type: 'The Harmonizer',
    description: "You're empathetic and cooperative. You excel at creating supportive environments where everyone can succeed.",
    icon: '💚',
  },
  EmotionalStability: {
    type: 'The Anchor',
    description: "You're calm under pressure and bring stability to any team. Your resilience and composure inspire confidence.",
    icon: '⚓',
  },
};

const OCEAN_DIMENSIONS = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'EmotionalStability'];

interface DimensionScore {
  dimension: string;
  subdimension: string;
  rawScore: number;
  normalizedScore: number;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [hasLastResults, setHasLastResults] = useState(false);
  const navigate = useNavigate();
  const { user, session } = useAuth();

  useEffect(() => {
    fetch('/api/quiz/questions')
      .then((r) => r.json())
      .then((data: QuizQuestion[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function detectLastResults() {
      if (user && session?.access_token) {
        try {
          const r = await fetch('/api/quiz/last', {
            headers: { Authorization: `Bearer ${session.access_token}` },
          });
          if (cancelled) return;
          setHasLastResults(r.ok);
          return;
        } catch {
          // Fall through to local check
        }
      }

      try {
        const stored = localStorage.getItem('jh-quiz-results');
        if (!cancelled) setHasLastResults(Boolean(stored));
      } catch {
        if (!cancelled) setHasLastResults(false);
      }
    }

    detectLastResults();
    return () => {
      cancelled = true;
    };
  }, [user, session?.access_token]);

  const total = questions.length;
  const totalPages = Math.ceil(total / QUESTIONS_PER_PAGE);
  const pageQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE,
  );
  const pageComplete = pageQuestions.length > 0 && pageQuestions.every((q) => answers[q.id] !== undefined);
  const progress = totalPages > 0 ? Math.round(((currentPage + 1) / totalPages) * 100) : 0;
  const isLastPage = currentPage >= totalPages - 1;

  function selectOption(questionId: number, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function next() {
    if (!pageComplete) return;
    if (isLastPage) {
      submitQuiz();
      return;
    }
    setCurrentPage((p) => p + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function back() {
    if (currentPage <= 0) return;
    setCurrentPage((p) => p - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function submitQuiz() {
    if (submitting) return;
    setSubmitting(true);

    const responses = questions.map((question) => ({
      questionId: question.id,
      answerValue: answers[question.id] ?? 3,
    }));

    apiClient('/api/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ responses }),
    })
      .then((r) => r.json())
      .then((data: { success: boolean; dimensionScores: DimensionScore[]; careerMatches: CareerMatch[] }) => {
        const oceanScores = buildOceanScores(data.dimensionScores ?? []);
        const dominantTrait = Object.keys(oceanScores).reduce((a, b) =>
          oceanScores[b] > oceanScores[a] ? b : a
        );
        const motivation = MOTIVATION_TYPES[dominantTrait] ?? MOTIVATION_TYPES.Openness;

        const quizResults: QuizResults = {
          openness: oceanScores.Openness,
          conscientiousness: oceanScores.Conscientiousness,
          extraversion: oceanScores.Extraversion,
          agreeableness: oceanScores.Agreeableness,
          emotionalStability: oceanScores.EmotionalStability,
          motivationType: motivation.type,
          motivationDescription: motivation.description,
          motivationIcon: motivation.icon,
          careerMatches: data.careerMatches ?? [],
        };

        localStorage.setItem('jh-quiz-results', JSON.stringify(quizResults));

        if (user) {
          if (data.success) showSnackbar('Your results have been saved!');
          setTimeout(() => navigate('/quiz/results'), 700);
        } else {
          // Results are visible now, but not saved to the user's account.
          setShowSavePrompt(true);
        }
      })
      .catch(() => {
        setTimeout(() => navigate('/quiz/results'), 1000);
      });
  }

  function buildOceanScores(dimensionScores: DimensionScore[]): Record<string, number> {
    const totals: Record<string, number[]> = {};
    for (const dim of OCEAN_DIMENSIONS) totals[dim] = [];

    for (const ds of dimensionScores) {
      if (ds.dimension in totals) totals[ds.dimension].push(ds.normalizedScore);
    }

    const result: Record<string, number> = {};
    for (const dim of OCEAN_DIMENSIONS) {
      const scores = totals[dim];
      result[dim] = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 50;
    }
    return result;
  }

  if (loading) {
    return (
      <div className="jh-quiz-container" style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="jh-quiz-container" style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Failed to load quiz questions. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="jh-quiz-container">
      {hasLastResults && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <Link to="/quiz/results" className="jh-btn-secondary">
            View my last results
          </Link>
        </div>
      )}

      <div className="jh-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Career Personality Quiz</h2>
        <p>Answer each question honestly — there are no right or wrong answers.</p>
      </div>

      {showSavePrompt && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: 'min(520px, 100%)',
              background: 'white',
              borderRadius: '12px',
              padding: '1.25rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            }}
          >
            <h3 style={{ marginTop: 0 }}>Save your results</h3>
            <p style={{ color: '#4b5563' }}>
              Your results are ready. To save them to your profile and access them on any device, please log in or sign up.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <button className="jh-btn-secondary" onClick={() => navigate('/quiz/results')}>
                Continue to results
              </button>
              <button className="jh-btn-secondary" onClick={() => navigate('/login')}>
                Log in
              </button>
              <button className="jh-btn-primary" onClick={() => navigate('/signup')}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="jh-quiz-progress">
        <div className="jh-quiz-progress-bar">
          <div
            className="jh-quiz-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="jh-quiz-progress-text">
          <span>Page {currentPage + 1} of {totalPages}</span>
          <span>{progress}%</span>
        </div>
      </div>

      <div className="jh-quiz-page">
        {pageQuestions.map((q, idx) => {
          const options = q.questionFormat === 'Interest' ? INTEREST_OPTIONS : LIKERT_OPTIONS;
          const selectedAnswer = answers[q.id];
          const globalIndex = currentPage * QUESTIONS_PER_PAGE + idx + 1;

          return (
            <div key={q.id} className="jh-quiz-card jh-quiz-card--paged">
              <p className="jh-quiz-card-number">Question {globalIndex} of {total}</p>
              <h3>{q.text}</h3>
              <div className="jh-quiz-options-row">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    className={`jh-quiz-option jh-quiz-option--compact${selectedAnswer === opt.value ? ' selected' : ''}`}
                    onClick={() => selectOption(q.id, opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!pageComplete && (
        <p className="jh-quiz-page-hint">Answer all questions on this page to continue.</p>
      )}

      <div className="jh-quiz-nav">
        <button
          className="jh-btn-secondary"
          style={{ visibility: currentPage > 0 ? 'visible' : 'hidden' }}
          onClick={back}
        >
          ← Back
        </button>
        <button
          className="jh-btn-primary"
          disabled={!pageComplete || submitting}
          onClick={next}
        >
          {submitting ? 'Submitting…' : isLastPage ? 'See Results' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
