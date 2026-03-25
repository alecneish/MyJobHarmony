import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import QuestionStepper, { QuestionDef } from '../components/questions/QuestionStepper';
import type { QuizQuestion, QuizResults, CareerMatch } from '../types';
import { apiClient } from '../lib/apiClient';

const LIKERT_OPTIONS = [
  { value: '1', label: 'Strongly Disagree' },
  { value: '2', label: 'Disagree' },
  { value: '3', label: 'Neutral' },
  { value: '4', label: 'Agree' },
  { value: '5', label: 'Strongly Agree' },
];

const INTEREST_OPTIONS = [
  { value: '1', label: 'Not at all' },
  { value: '2', label: 'Slightly' },
  { value: '3', label: 'Moderately' },
  { value: '4', label: 'Very' },
  { value: '5', label: 'Extremely' },
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

const TRAITS: { key: keyof QuizResults; label: string }[] = [
  { key: 'openness', label: 'Openness' },
  { key: 'conscientiousness', label: 'Conscientiousness' },
  { key: 'extraversion', label: 'Extraversion' },
  { key: 'agreeableness', label: 'Agreeableness' },
  { key: 'emotionalStability', label: 'Emotional Stability' },
];

interface DimensionScore {
  dimension: string;
  subdimension: string;
  rawScore: number;
  normalizedScore: number;
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

type QuizMode = 'select' | 'full' | 'quick';

export default function QuizInterface() {
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [stepperQuestions, setStepperQuestions] = useState<QuestionDef[]>([]);
  const [mode, setMode] = useState<QuizMode>('select');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch('/api/quiz/questions')
      .then(r => r.json())
      .then((data: QuizQuestion[]) => {
        setAllQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => {
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, []);

  function startQuiz(selectedMode: 'full' | 'quick') {
    const questions = selectedMode === 'quick'
      ? allQuestions.filter(q => q.tier === 'Free' && q.section === 'Your Personality')
      : allQuestions;

    const defs: QuestionDef[] = questions.map(q => ({
      id: String(q.id),
      title: q.text,
      type: 'radio-chips' as const,
      options: q.questionFormat === 'Interest' ? INTEREST_OPTIONS : LIKERT_OPTIONS,
      required: true,
    }));

    setActiveQuestions(questions);
    setStepperQuestions(defs);
    setMode(selectedMode);
    setResults(null);
    setBarsAnimated(false);
  }

  function handleComplete(answers: Record<string, unknown>) {
    if (submitting) return;
    setSubmitting(true);

    const responses = activeQuestions.map(q => ({
      questionId: q.id,
      answerValue: Number(answers[String(q.id)] ?? 3),
    }));

    apiClient('/api/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ responses }),
    })
      .then(r => r.json())
      .then((data: { success: boolean; dimensionScores: DimensionScore[]; careerMatches: CareerMatch[] }) => {
        const oceanScores = buildOceanScores(data.dimensionScores ?? []);
        const dominantTrait = Object.keys(oceanScores).reduce((a, b) =>
          oceanScores[b] > oceanScores[a] ? b : a
        );
        const motivation = MOTIVATION_TYPES[dominantTrait] ?? MOTIVATION_TYPES.Openness;

        setResults({
          openness: oceanScores.Openness,
          conscientiousness: oceanScores.Conscientiousness,
          extraversion: oceanScores.Extraversion,
          agreeableness: oceanScores.Agreeableness,
          emotionalStability: oceanScores.EmotionalStability,
          motivationType: motivation.type,
          motivationDescription: motivation.description,
          motivationIcon: motivation.icon,
          careerMatches: data.careerMatches ?? [],
        });

        animationTimer.current = setTimeout(() => setBarsAnimated(true), 300);
        setSubmitting(false);
      })
      .catch(() => setSubmitting(false));
  }

  if (loading) {
    return (
      <div className="jh-quiz-container" style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Loading quiz...</p>
      </div>
    );
  }

  // Quiz selector
  if (mode === 'select') {
    return (
      <div className="jh-quiz-container">
        <div className="jh-section-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2>Career Personality Quiz</h2>
          <p>Choose how much time you have.</p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div
            className="jh-quiz-card"
            style={{ flex: '1 1 260px', maxWidth: '320px', cursor: 'pointer', textAlign: 'center' }}
            onClick={() => startQuiz('quick')}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚡</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Quick Quiz</h3>
            <p style={{ color: 'var(--jh-gray-600)', marginBottom: '1.5rem' }}>
              10 questions · ~2 minutes<br />Core personality snapshot
            </p>
            <button className="jh-btn-primary" onClick={() => startQuiz('quick')}>
              Start Quick Quiz
            </button>
          </div>

          <div
            className="jh-quiz-card"
            style={{ flex: '1 1 260px', maxWidth: '320px', cursor: 'pointer', textAlign: 'center' }}
            onClick={() => startQuiz('full')}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧭</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Full Quiz</h3>
            <p style={{ color: 'var(--jh-gray-600)', marginBottom: '1.5rem' }}>
              62 questions · ~10 minutes<br />Complete career profile
            </p>
            <button className="jh-btn-secondary" onClick={() => startQuiz('full')}>
              Start Full Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results view
  if (results) {
    const topMatches = results.careerMatches?.slice(0, 5) ?? [];

    return (
      <div className="jh-results-container">
        <div className="jh-motivation-card">
          <span className="jh-motivation-icon">{results.motivationIcon}</span>
          <h1>{results.motivationType}</h1>
          <p>{results.motivationDescription}</p>
        </div>

        <div className="jh-traits-card">
          <h3>Your Personality Profile</h3>
          {TRAITS.map(({ key, label }) => {
            const value = results[key] as number;
            return (
              <div key={key} className="jh-trait-row">
                <div className="jh-trait-label">
                  <span>{label}</span>
                  <span className="jh-trait-value">{value}%</span>
                </div>
                <div className="jh-trait-bar">
                  <div
                    className="jh-trait-fill"
                    style={{ width: barsAnimated ? `${value}%` : '0%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {topMatches.length > 0 && (
          <div className="jh-traits-card" style={{ marginTop: '1.5rem' }}>
            <h3>Your Top Career Matches</h3>
            {topMatches.map((match) => (
              <div key={match.careerProfileId} className="jh-trait-row">
                <div className="jh-trait-label">
                  <span>{match.rank}. {match.title}</span>
                  <span className="jh-trait-value">{Math.round(match.matchScore)}%</span>
                </div>
                <div className="jh-trait-bar">
                  <div
                    className="jh-trait-fill"
                    style={{ width: barsAnimated ? `${match.matchScore}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/jobs" className="jh-btn-primary">Browse Matching Jobs →</Link>
          <button className="jh-btn-secondary" onClick={() => setMode('select')}>Try Other Quiz</button>
        </div>
      </div>
    );
  }

  // Active quiz
  return (
    <div className="jh-quiz-lab">
      <div className="jh-section-header" style={{ marginBottom: '1rem' }}>
        <h2>{mode === 'quick' ? 'Quick Quiz' : 'Full Quiz'}</h2>
        <p>Answer each question honestly — there are no right or wrong answers.</p>
      </div>

      <QuestionStepper
        questions={stepperQuestions}
        onComplete={handleComplete}
      />
    </div>
  );
}
