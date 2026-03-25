import { Router, Request, Response } from 'express';
import { supabase } from '../db/database';
import { getApplicants as getSeedApplicants } from '../data/seedData';
import { Applicant } from '../types';

const router = Router();

function splitCsv(v: unknown): string[] {
  if (typeof v !== 'string') return [];
  return v
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('Applicants').select('*').order('Id', { ascending: true });
  if (error || !data) {
    // Keep the app usable locally even if Supabase is misconfigured.
    if (error) console.error('Failed to load applicants from Supabase:', error);
    const applicants = getSeedApplicants();
    res.json({
      recommendedApplicants: applicants.filter((a) => a.isRecommended),
      allApplicants: applicants.filter((a) => !a.isRecommended),
    });
    return;
  }

  const applicants: Applicant[] = data.map((row: any) => ({
    id: row.Id,
    name: row.Name,
    initials: row.Initials ?? '',
    avatarColor: row.AvatarColor ?? '',
    bio: row.Bio ?? undefined,
    resumeUrl: row.ResumeUrl ?? undefined,
    resumeFitPercent: row.ResumeFitPercent ?? 0,
    personalityFitPercent: row.PersonalityFitPercent ?? 0,
    skills: splitCsv(row.Skills),
    isRecommended: Boolean(row.IsRecommended),
    title: row.Title ?? '',
  }));

  const recommended = applicants.filter((a) => a.isRecommended);
  const all = applicants.filter((a) => !a.isRecommended);

  res.json({ recommendedApplicants: recommended, allApplicants: all });
});

export default router;
