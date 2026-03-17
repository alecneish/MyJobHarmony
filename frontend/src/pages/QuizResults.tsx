import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { QuizResults } from '../types';

const DEFAULT_RESULT: QuizResults = {
  motivationType: 'The Innovator',
  motivationDescription: "You thrive on creativity and new ideas. You're driven by curiosity and love exploring uncharted territory.",
  motivationIcon: '💡',
  openness: 75,
  conscientiousness: 65,
  extraversion: 60,
  agreeableness: 70,
  emotionalStability: 68,
};

const TRAITS: { key: keyof QuizResults; label: string }[] = [
  { key: 'openness', label: 'Openness' },
  { key: 'conscientiousness', label: 'Conscientiousness' },
  { key: 'extraversion', label: 'Extraversion' },
  { key: 'agreeableness', label: 'Agreeableness' },
  { key: 'emotionalStability', label: 'Emotional Stability' },
];

export default function QuizResults() {
  const [results, setResults] = useState<QuizResults>(DEFAULT_RESULT);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('jh-quiz-results');
    if (stored) {
      try {
        setResults(JSON.parse(stored) as QuizResults);
      } catch {
        // use default
      }
    }

    animationTimer.current = setTimeout(() => {
      setBarsAnimated(true);
    }, 300);

    return () => {
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, []);

  function handleRetake() {
    localStorage.removeItem('jh-quiz-results');
    navigate('/quiz');
  }

  return (
    <div className="jh-results-container">
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

      <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/jobs" className="jh-btn-primary">Browse Matching Jobs →</Link>
        <button className="jh-btn-secondary" onClick={handleRetake}>Retake Quiz</button>
      </div>
    </div>
  );
}
