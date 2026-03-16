import { Router, Request, Response } from 'express';
import { getQuizQuestions } from '../data/seedData';
import { getCareerProfiles } from '../data/careerProfiles';
import { computeScores } from '../services/scoringEngine';
import { computeMatches } from '../services/careerMatchingService';
import { QuizResponse } from '../types';

const router = Router();

router.get('/questions', (_req: Request, res: Response) => {
  const questions = getQuizQuestions();
  res.json(questions);
});

router.post('/submit', async (req: Request, res: Response) => {
  const { responses } = req.body as { responses: QuizResponse[] };

  if (!Array.isArray(responses) || responses.length === 0) {
    res.status(400).json({ success: false, message: 'responses must be a non-empty array' });
    return;
  }

  for (const r of responses) {
    if (typeof r.questionId !== 'number' || typeof r.answerValue !== 'number' ||
        r.answerValue < 1 || r.answerValue > 5) {
      res.status(400).json({ success: false, message: 'Each response requires questionId and answerValue (1–5)' });
      return;
    }
  }

  const dimensionScores = computeScores(responses);
  const careers = getCareerProfiles();
  const careerMatches = computeMatches(dimensionScores, careers);

  res.json({ success: true, dimensionScores, careerMatches });
});

export default router;
