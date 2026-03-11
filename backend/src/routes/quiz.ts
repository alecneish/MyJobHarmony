import { Router, Request, Response } from 'express';
import { getQuizQuestions } from '../data/seedData';
import { QuizResultDto } from '../types';

const router = Router();

router.get('/questions', (_req: Request, res: Response) => {
  const questions = getQuizQuestions();
  res.json(questions);
});

router.post('/results', async (req: Request, res: Response) => {
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

  // TODO: implement persistence via migrations-backed tables
  res.status(501).json({ success: false, message: 'Persistence not yet implemented' });
});

export default router;
