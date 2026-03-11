import { Router, Request, Response } from 'express';
import { getQuizQuestions } from '../data/seedData';
import { insertQuizResult } from '../db/database';
import { QuizResultDto } from '../types';

const router = Router();

router.get('/questions', (_req: Request, res: Response) => {
  const questions = getQuizQuestions();
  res.json(questions);
});

router.post('/results', (req: Request, res: Response) => {
  const dto = req.body as QuizResultDto;

  if (
    dto.openness === undefined ||
    dto.conscientiousness === undefined ||
    dto.extraversion === undefined ||
    dto.agreeableness === undefined ||
    dto.emotionalStability === undefined ||
    !dto.dominantTrait ||
    !dto.motivationType
  ) {
    res.status(400).json({ success: false, message: 'Missing required fields' });
    return;
  }

  const id = insertQuizResult({
    openness: dto.openness,
    conscientiousness: dto.conscientiousness,
    extraversion: dto.extraversion,
    agreeableness: dto.agreeableness,
    emotionalStability: dto.emotionalStability,
    dominantTrait: dto.dominantTrait,
    motivationType: dto.motivationType,
  });

  res.json({ success: true, resultId: id, message: 'Results saved!' });
});

export default router;
