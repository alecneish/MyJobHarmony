import { Outlet, NavLink } from 'react-router-dom';
import Snackbar from './Snackbar';

export default function Layout() {
  return (
    <>
      <header>
        <nav className="jh-navbar">
          <div className="jh-navbar-inner">
            <NavLink to="/" className="jh-brand">JobHarmony</NavLink>
            <ul className="jh-nav-links">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/quiz"
                  className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}
                >
                  Quiz
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  end
                  className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}
                >
                  Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs/saved"
                  className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}
                >
                  Saved
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recruit"
                  className={({ isActive }) => 'jh-nav-link' + (isActive ? ' active' : '')}
                >
                  Recruit
                </NavLink>
              </li>
            </ul>
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
            <li><NavLink to="/jobs">Jobs</NavLink></li>
            <li><NavLink to="/recruit">Recruit</NavLink></li>
          </ul>
        </div>
      </footer>

      <Snackbar />
    </>
  );
}
