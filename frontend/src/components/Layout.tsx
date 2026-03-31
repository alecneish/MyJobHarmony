import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Snackbar from './Snackbar';

export default function Layout() {
  const { user, userProfile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isRecruiter = !!(user && userProfile?.role === 'recruiter');
  const hasResults = Boolean(user && localStorage.getItem('jh-quiz-results'));

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header>
        <nav className="jh-navbar">
          <div className="jh-navbar-inner">
            <NavLink to="/" className="jh-brand" onClick={closeMenu}>JobHarmony</NavLink>

            <button
              className={`jh-hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <span /><span /><span />
            </button>

            <ul className={`jh-nav-links${menuOpen ? ' open' : ''}`}>
              <li>
                <NavLink to="/" end className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              {!isRecruiter && (
                <li>
                  <NavLink to="/jobs" end className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                    Jobs
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/quiz" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                  Quiz
                </NavLink>
              </li>

              {hasResults && (
                <li>
                  <NavLink to="/quiz/results" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                    Results
                  </NavLink>
                </li>
              )}

              {user && !loading && userProfile?.role === 'job_seeker' && (
                <>
                  <li>
                    <NavLink to="/candidate/dashboard" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/jobs/saved" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                      Saved
                    </NavLink>
                  </li>
                </>
              )}

              {isRecruiter && (
                <>
                  <li>
                    <NavLink to="/recruiter/dashboard" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/recruit" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                      Candidates
                    </NavLink>
                  </li>
                </>
              )}

              {user && !loading && (
                <li>
                  <NavLink to="/profile/edit" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                    Edit Profile
                  </NavLink>
                </li>
              )}

              {!user && !loading && (
                <>
                  <li>
                    <NavLink to="/login" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>
                      Signup
                    </NavLink>
                  </li>
                </>
              )}

              {/* User chip inside nav for mobile layout */}
              <li className="jh-nav-user-chip">
                {user ? (
                  <>
                    <span className="jh-user-email">{user.email}</span>
                    <button
                      type="button"
                      className="jh-btn-secondary"
                      style={{ padding: '0.35rem 0.75rem' }}
                      onClick={async () => {
                        await handleSignOut();
                        closeMenu();
                      }}
                      disabled={loading}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <span className="jh-user-email">Not signed in</span>
                )}
              </li>
            </ul>

            <div className="jh-user-chip jh-user-chip--desktop">
              {user ? (
                <>
                  <span className="jh-user-email">{user.email}</span>
                  <button
                    type="button"
                    className="jh-btn-secondary"
                    style={{ padding: '0.35rem 0.75rem' }}
                    onClick={handleSignOut}
                    disabled={loading}
                  >
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
            {user && <li><NavLink to="/profile/edit">Edit Profile</NavLink></li>}
          </ul>
        </div>
      </footer>

      <Snackbar />
    </>
  );
}
