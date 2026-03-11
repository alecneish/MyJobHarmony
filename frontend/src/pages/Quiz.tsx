import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizQuestion, QuizResults } from '../types';
import { showSnackbar } from '../components/Snackbar';

interface Answer {
  trait: string;
  weight: number;
}

const MOTIVATION_TYPES: Record<string, { type: string; description: string; icon: string }> = {
  openness: {
    type: 'The Innovator',
    description: "You thrive on creativity and new ideas. You're driven by curiosity and love exploring uncharted territory.",
    icon: '💡',
  },
  conscientiousness: {
    type: 'The Achiever',
    description: "You're goal-oriented and detail-driven. You find satisfaction in completing tasks with precision and excellence.",
    icon: '🎯',
  },
  extraversion: {
    type: 'The Connector',
    description: "You're energized by people and thrive in collaborative environments. Building relationships is your superpower.",
    icon: '🤝',
  },
  agreeableness: {
    type: 'The Harmonizer',
    description: "You're empathetic and cooperative. You excel at creating supportive environments where everyone can succeed.",
    icon: '💚',
  },
  emotionalStability: {
    type: 'The Anchor',
    description: "You're calm under pressure and bring stability to any team. Your resilience and composure inspire confidence.",
    icon: '⚓',
  },
};

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/quiz/questions')
      .then((r) => r.json())
      .then((data: QuizQuestion[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const total = questions.length;
  const progress = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
  const currentAnswer = answers[current];

  function selectOption(trait: string, weight: number) {
    setAnswers((prev) => ({ ...prev, [current]: { trait, weight } }));
  }

  function next() {
    if (!currentAnswer) return;

    if (current >= total - 1) {
      computeAndSave();
      return;
    }

    setCurrent((c) => c + 1);
  }

  function back() {
    if (current <= 0) return;
    setCurrent((c) => c - 1);
  }

  function computeAndSave() {
    const traits: Record<string, number> = {
      openness: 0, conscientiousness: 0, extraversion: 0,
      agreeableness: 0, emotionalStability: 0,
    };
    const traitCounts: Record<string, number> = {
      openness: 0, conscientiousness: 0, extraversion: 0,
      agreeableness: 0, emotionalStability: 0,
    };

    Object.values(answers).forEach((a) => {
      if (a.trait in traits) {
        traits[a.trait] += a.weight;
        traitCounts[a.trait]++;
      }
    });

    const result: Record<string, number> = {};
    for (const t in traits) {
      const maxPossible = traitCounts[t] * 3;
      result[t] = maxPossible > 0 ? Math.min(100, Math.max(0, Math.round((traits[t] / maxPossible) * 100))) : 50;
    }

    const dominantTrait = Object.keys(result).reduce((a, b) => (result[b] > result[a] ? b : a));
    const motivation = MOTIVATION_TYPES[dominantTrait] ?? MOTIVATION_TYPES.openness;

    const quizResults: QuizResults = {
      openness: result.openness,
      conscientiousness: result.conscientiousness,
      extraversion: result.extraversion,
      agreeableness: result.agreeableness,
      emotionalStability: result.emotionalStability,
      motivationType: motivation.type,
      motivationDescription: motivation.description,
      motivationIcon: motivation.icon,
    };

    localStorage.setItem('jh-quiz-results', JSON.stringify(quizResults));

    fetch('/api/quiz/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        openness: result.openness,
        conscientiousness: result.conscientiousness,
        extraversion: result.extraversion,
        agreeableness: result.agreeableness,
        emotionalStability: result.emotionalStability,
        dominantTrait,
        motivationType: motivation.type,
      }),
    })
      .then((r) => r.json())
      .then((data: { success: boolean }) => {
        if (data.success) showSnackbar('Your results have been saved!');
        setTimeout(() => navigate('/quiz/results'), 1000);
      })
      .catch(() => {
        setTimeout(() => navigate('/quiz/results'), 1000);
      });
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

  const q = questions[current];

  return (
    <div className="jh-quiz-container">
      <div className="jh-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Career Personality Quiz</h2>
        <p>Answer each question honestly — there are no right or wrong answers.</p>
      </div>

      <div className="jh-quiz-progress">
        <div className="jh-quiz-progress-bar">
          <div
            className="jh-quiz-progress-fill"
            id="jh-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="jh-quiz-progress-text">
          <span>Question {current + 1} of {total}</span>
          <span>{progress}%</span>
        </div>
      </div>

      <div className="jh-quiz-card" data-question={current}>
        <h2>{q.questionText}</h2>
        {q.options.map((opt) => (
          <button
            key={opt.id}
            className={`jh-quiz-option${currentAnswer?.trait === opt.trait && answers[current]?.weight === opt.weight && answers[current] ? ' selected' : ''}`}
            onClick={() => selectOption(opt.trait, opt.weight)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="jh-quiz-nav">
        <button
          className="jh-btn-secondary"
          id="jh-quiz-back"
          style={{ visibility: current > 0 ? 'visible' : 'hidden' }}
          onClick={back}
        >
          ← Back
        </button>
        <button
          className="jh-btn-primary"
          id="jh-quiz-next"
          disabled={!currentAnswer}
          onClick={next}
        >
          {current >= total - 1 ? 'See Results' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
