import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import quizRouter from './routes/quiz';
import jobsRouter from './routes/jobs';
import recruitRouter from './routes/recruit';
import applicantRouter from './routes/applicant';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/quiz', quizRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/recruit', recruitRouter);
app.use('/api/applicant', applicantRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`JobHarmony backend running on http://localhost:${PORT}`);
});
