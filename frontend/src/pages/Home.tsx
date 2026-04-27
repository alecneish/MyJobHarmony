import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="jh-hero">
        <h1>Find Your Perfect Career Match</h1>
        <p>
          Discover jobs that align with your personality, skills, and values. Take our quick quiz
          and let JobHarmony guide your next career move.
        </p>
        <div className="jh-hero-actions jh-hero-actions--single">
          <Link to="/quiz" className="jh-btn-primary">Take the Quiz</Link>
        </div>
      </section>

      <section className="jh-section">
        <div className="container">
          <div className="jh-section-header">
            <h2>How It Works</h2>
            <p>Three simple steps to finding work that truly fits who you are.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="jh-step-card">
                <span className="jh-step-number">1</span>
                <h3>Take the Quiz</h3>
                <p>Answer 8 quick questions about your work style, preferences, and personality traits.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="jh-step-card">
                <span className="jh-step-number">2</span>
                <h3>Get Your Profile</h3>
                <p>
                  Receive a personalized breakdown of your Big Five personality traits and motivation
                  type.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="jh-step-card">
                <span className="jh-step-number">3</span>
                <h3>Discover Matches</h3>
                <p>
                  Browse curated job listings ranked by how well they match your unique personality
                  profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="jh-section jh-section-alt">
        <div className="container">
          <div className="jh-cta-section">
            <h2>Ready to Find Your Fit?</h2>
            <p>
              Join thousands of professionals who have discovered careers aligned with who they truly
              are.
            </p>
            <Link to="/quiz" className="jh-btn-primary">Start Your Journey</Link>
          </div>
        </div>
      </section>
    </>
  );
}
