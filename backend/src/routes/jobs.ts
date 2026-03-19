import { Router, Request, Response } from 'express';
import { getJobs } from '../data/seedData';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const jobs = getJobs();
  const allTags = [...new Set(jobs.flatMap((j) => j.tags))];
  const allTypes = [...new Set(jobs.map((j) => j.type))];
  const allLocations = [...new Set(jobs.map((j) => j.location))];

  res.json({ jobs, allTags, allTypes, allLocations });
});

export default router;
