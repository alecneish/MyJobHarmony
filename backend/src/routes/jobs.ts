import { Router, Request, Response } from 'express';
import { supabase } from '../db/database';
import { Job } from '../types';

const router = Router();

function splitCsv(v: unknown): string[] {
  if (typeof v !== 'string') return [];
  return v
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('Jobs').select('*').order('Id', { ascending: true });
  if (error || !data) {
    res.status(500).json({ message: 'Failed to load jobs' });
    return;
  }

  const jobs: Job[] = data.map((row: any) => ({
    id: row.Id,
    title: row.Title,
    company: row.Company,
    logoEmoji: row.LogoEmoji,
    location: row.Location,
    salary: row.Salary,
    type: row.Type,
    description: row.Description ?? undefined,
    personalityType: row.PersonalityType ?? undefined,
    fitScore: row.FitScore ?? 0,
    fitLevel: row.FitLevel ?? '',
    fitReason: row.FitReason ?? '',
    tags: splitCsv(row.Tags),
    postedDaysAgo: row.PostedDaysAgo ?? 0,
  }));

  const allTags = [...new Set(jobs.flatMap((j) => j.tags))];
  const allTypes = [...new Set(jobs.map((j) => j.type))];
  const allLocations = [...new Set(jobs.map((j) => j.location))];

  res.json({ jobs, allTags, allTypes, allLocations });
});

export default router;
