import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CandidateDashboard() {
  const { userProfile } = useAuth();

  return (
    <div className="jh-jobs-container">
      <div className="jh-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Welcome, {userProfile?.username || 'Candidate'}</h2>
        <p>Your job-seeking dashboard.</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <Link to="/quiz" className="jh-quiz-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#x1F9ED;</div>
          <h3>Career Quiz</h3>
          <p style={{ color: 'var(--jh-gray-600)' }}>Discover roles that match your personality.</p>
        </Link>

        <Link to="/jobs" className="jh-quiz-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#x1F4BC;</div>
          <h3>Browse Jobs</h3>
          <p style={{ color: 'var(--jh-gray-600)' }}>Find openings ranked by personality fit.</p>
        </Link>

        <Link to="/jobs/saved" className="jh-quiz-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#x1F516;</div>
          <h3>Saved Jobs</h3>
          <p style={{ color: 'var(--jh-gray-600)' }}>Review your bookmarked listings.</p>
        </Link>
      </div>
    </div>
  );
}
