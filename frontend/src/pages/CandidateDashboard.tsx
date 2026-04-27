import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CandidateDashboard() {
  const { userProfile } = useAuth();

  return (
    <div className="jh-jobs-container">
      <div className="jh-section-header jh-section-header--spacious">
        <h2>Welcome, {userProfile?.username || 'Candidate'}</h2>
        <p>Your job-seeking dashboard.</p>
      </div>

      <div className="jh-dashboard-grid">
        <Link to="/quiz" className="jh-quiz-card jh-card-link">
          <h3>Career Quiz</h3>
          <p className="jh-muted-copy">Discover roles that match your personality.</p>
        </Link>

        <Link to="/jobs" className="jh-quiz-card jh-card-link">
          <h3>Browse Jobs</h3>
          <p className="jh-muted-copy">Find openings ranked by personality fit.</p>
        </Link>

        <Link to="/jobs/saved" className="jh-quiz-card jh-card-link">
          <h3>Saved Jobs</h3>
          <p className="jh-muted-copy">Review your bookmarked listings.</p>
        </Link>
      </div>
    </div>
  );
}
