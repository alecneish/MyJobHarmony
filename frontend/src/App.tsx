import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import QuizResults from './pages/QuizResults';
import Jobs from './pages/Jobs';
import SavedJobs from './pages/SavedJobs';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorized from './pages/Unauthorized';
import AuthCallback from './pages/AuthCallback';
import CandidateDashboard from './pages/CandidateDashboard';
import RequireAuth from './components/guards/RequireAuth';
import RequireRole from './components/guards/RequireRole';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/results" element={<QuizResults />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Authenticated routes (any role) */}
          <Route element={<RequireAuth />}>
            <Route path="/profile/edit" element={<EditProfile />} />

            {/* Job seeker routes */}
            <Route element={<RequireRole roles={['job_seeker']} />}>
              <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
              <Route path="/jobs/saved" element={<SavedJobs />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
