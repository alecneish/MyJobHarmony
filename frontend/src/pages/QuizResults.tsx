import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { QuizResults, CareerMatch } from '../types';
import { useAuth } from '../context/AuthContext';

const TRAITS: { key: keyof QuizResults; label: string }[] = [
  { key: 'openness', label: 'Openness' },
  { key: 'conscientiousness', label: 'Conscientiousness' },
  { key: 'extraversion', label: 'Extraversion' },
  { key: 'agreeableness', label: 'Agreeableness' },
  { key: 'emotionalStability', label: 'Emotional Stability' },
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

export default function QuizResults() {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [source, setSource] = useState<'server' | 'local' | null>(null);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { user, session } = useAuth();

  useEffect(() => {
    let cancelled = false;

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

    function tryLoadLocal(): boolean {
      try {
        const stored = localStorage.getItem('jh-quiz-results');
        if (!stored) return false;
        const parsed = JSON.parse(stored) as QuizResults;
        if (!cancelled) {
          setResults(parsed);
          setSource('local');
          animationTimer.current = setTimeout(() => setBarsAnimated(true), 300);
        }
        return true;
      } catch {
        return false;
      }
    }

    async function load() {
      if (user && session?.access_token) {
        try {
          const r = await fetch('/api/quiz/last', {
            headers: { Authorization: `Bearer ${session.access_token}` },
          });
          if (r.ok) {
            const data = await r.json() as { dimensionScores: DimensionScore[]; careerMatches: CareerMatch[] };
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

            if (!cancelled) {
              setResults(quizResults);
              setSource('server');
              animationTimer.current = setTimeout(() => setBarsAnimated(true), 300);
            }
            return;
          }
        } catch {
          // fall back to local
        }
      }

      tryLoadLocal();
    }

    load();

    return () => {
      cancelled = true;
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, [user, session?.access_token]);

  function handleRetake() {
    localStorage.removeItem('jh-quiz-results');
    navigate('/quiz');
  }

  if (!results) {
    return (
      <div className="jh-results-container" style={{ textAlign: 'center', padding: '4rem' }}>
        <p style={{ color: 'var(--jh-gray-600)', marginBottom: '1.5rem' }}>
          No results yet — take the quiz to see your personality profile and career matches.
        </p>
        <Link to="/quiz" className="jh-btn-primary">Take the Quiz</Link>
      </div>
    );
  }

  const topMatches: CareerMatch[] = results.careerMatches?.slice(0, 5) ?? [];

  return (
    <div className="jh-results-container">
      {!user && source === 'local' && (
        <div
          style={{
            background: '#fff7ed',
            border: '1px solid #fed7aa',
            color: '#7c2d12',
            padding: '0.85rem 1rem',
            borderRadius: '12px',
            marginBottom: '1.25rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <span>
            Want to save these results to your profile? Please log in or sign up.
          </span>
          <span style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link to="/login" className="jh-btn-secondary">Log in</Link>
            <Link to="/signup" className="jh-btn-primary">Sign up</Link>
          </span>
        </div>
      )}

      <div className="jh-motivation-card">
        <span className="jh-motivation-icon" id="jh-result-icon">{results.motivationIcon}</span>
        <h1 id="jh-result-type">{results.motivationType}</h1>
        <p id="jh-result-desc">{results.motivationDescription}</p>
      </div>

      <div className="jh-traits-card">
        <h3>Your Personality Profile</h3>

        {TRAITS.map(({ key, label }) => {
          const value = results[key] as number;
          return (
            <div key={key} className="jh-trait-row">
              <div className="jh-trait-label">
                <span>{label}</span>
                <span className="jh-trait-value" data-trait={key}>{value}%</span>
              </div>
              <div className="jh-trait-bar">
                <div
                  className="jh-trait-fill"
                  data-trait={key}
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
        <button className="jh-btn-secondary" onClick={handleRetake}>Retake Quiz</button>
      </div>
    </div>
  );
}
