import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RecruiterDashboard() {
  const { userProfile } = useAuth();

  return (
    <div className="jh-recruit-container">
      <div className="jh-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Welcome, {userProfile?.username || 'Recruiter'}</h2>
        <p>Your recruiting dashboard.</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <Link to="/recruit" className="jh-quiz-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#x1F465;</div>
          <h3>Browse Candidates</h3>
          <p style={{ color: 'var(--jh-gray-600)' }}>Find talent that matches your openings.</p>
        </Link>

        <div className="jh-quiz-card" style={{ opacity: 0.6 }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#x1F4DD;</div>
          <h3>Manage Postings</h3>
          <p style={{ color: 'var(--jh-gray-600)' }}>Create and manage job listings. Coming soon.</p>
        </div>

        <div className="jh-quiz-card" style={{ opacity: 0.6 }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#x1F4CA;</div>
          <h3>Analytics</h3>
          <p style={{ color: 'var(--jh-gray-600)' }}>Track views, applications, and conversions. Coming soon.</p>
        </div>
      </div>
    </div>
  );
}
