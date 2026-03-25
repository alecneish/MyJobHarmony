import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import quizRouter from './routes/quiz';
import jobsRouter from './routes/jobs';
import recruitRouter from './routes/recruit';
import applicantRouter from './routes/applicant';
import { authenticate, requireActive, requireRole } from './middleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Public routes
app.use('/api/quiz', quizRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applicant', applicantRouter);

// Protected routes
app.use('/api/recruit', authenticate, requireActive, requireRole('recruiter'), recruitRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`JobHarmony backend running on http://localhost:${PORT}`);
});
