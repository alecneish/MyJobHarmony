import { Router, Request, Response } from 'express';
import { getApplicants } from '../data/seedData';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const applicants = getApplicants();
  const recommended = applicants.filter((a) => a.isRecommended);
  const all = applicants.filter((a) => !a.isRecommended);

  res.json({ recommendedApplicants: recommended, allApplicants: all });
});

export default router;
