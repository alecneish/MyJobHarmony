import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Snackbar from './Snackbar';

export default function Layout() {
  const { user, userProfile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const isRecruiter = !!(user && userProfile?.role === 'recruiter');

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <>
      <header>
        <nav className="jh-navbar">
          <div className="jh-navbar-inner">
            <NavLink to="/" className="jh-brand">JobHarmony</NavLink>
            <ul className="jh-nav-links">
              <li>
                <NavLink to="/" end className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                  Home
                </NavLink>
              </li>
              {!isRecruiter && (
                <li>
                  <NavLink to="/jobs" end className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                    Jobs
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/quiz" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                  Quiz
                </NavLink>
              </li>

              {user && !loading && userProfile?.role === 'job_seeker' && (
                <>
                  <li>
                    <NavLink to="/candidate/dashboard" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/jobs/saved" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                      Saved
                    </NavLink>
                  </li>
                </>
              )}

              {isRecruiter && (
                <>
                  <li>
                    <NavLink to="/recruiter/dashboard" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/recruit" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                      Candidates
                    </NavLink>
                  </li>
                </>
              )}

              {!user && !loading && (
                <>
                  <li>
                    <NavLink to="/login" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}>
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <div className="jh-user-chip">
              {user ? (
                <>
                  <span className="jh-user-email">{user.email}</span>
                  <button className="jh-btn-secondary" style={{ padding: '0.35rem 0.75rem' }} onClick={handleSignOut} disabled={loading}>
                    Sign out
                  </button>
                </>
              ) : (
                <span className="jh-user-email">Not signed in</span>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main role="main">
        <Outlet />
      </main>

      <footer className="jh-footer">
        <div className="jh-footer-content">
          <div>
            <div className="jh-footer-brand">JobHarmony</div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
              &copy; 2026 JobHarmony. All rights reserved.
            </p>
          </div>
          <ul className="jh-footer-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/quiz">Quiz</NavLink></li>
            {!isRecruiter && <li><NavLink to="/jobs">Jobs</NavLink></li>}
          </ul>
        </div>
      </footer>

      <Snackbar />
    </>
  );
}
