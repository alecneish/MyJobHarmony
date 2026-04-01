import { Router, Request, Response } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { supabase } from '../db/database';
import { Applicant, ApplicantCreateDto, ApplicantUpdateDto } from '../types';

const router = Router();

const uploadsDir = path.resolve(__dirname, '../../uploads/resumes');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeBase = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeBase}`);
  },
});

const upload = multer({ storage });

const avatarPalette = ['#E67E22', '#3498DB', '#2ECC71', '#9B59B6', '#E74C3C', '#1ABC9C'];

function splitCsv(v: unknown): string[] {
  if (typeof v !== 'string') return [];
  return v
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function toCsv(values: string[]): string {
  return values.map((v) => v.trim()).filter(Boolean).join(',');
}

function buildInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}

function pickAvatarColor(name: string): string {
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return avatarPalette[hash % avatarPalette.length];
}

function mapApplicant(row: any): Applicant {
  return {
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
  };
}

function parseId(param: string): number | null {
  const parsed = Number(param);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
}

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ message: 'Invalid applicant id' });
    return;
  }

  const { data, error } = await supabase.from('Applicants').select('*').eq('Id', id).single();
  if (error || !data) {
    res.status(404).json({ message: 'Applicant not found' });
    return;
  }

  res.json({ applicant: mapApplicant(data) });
});

router.post('/', async (req: Request<unknown, unknown, ApplicantCreateDto>, res: Response) => {
  const { name, title, bio, skills, resumeUrl } = req.body ?? {};
  const trimmedName = name?.trim();
  const trimmedTitle = title?.trim();

  if (!trimmedName || !trimmedTitle || !Array.isArray(skills)) {
    res.status(400).json({
      message: 'name, title, and skills are required',
    });
    return;
  }

  const payload = {
    Name: trimmedName,
    Initials: buildInitials(trimmedName),
    AvatarColor: pickAvatarColor(trimmedName),
    Bio: typeof bio === 'string' ? bio.trim() : null,
    ResumeUrl: typeof resumeUrl === 'string' ? resumeUrl.trim() : null,
    ResumeFitPercent: 0,
    PersonalityFitPercent: 0,
    Skills: toCsv(skills),
    IsRecommended: 1,
    Title: trimmedTitle,
  };

  const { data, error } = await supabase.from('Applicants').insert(payload).select('*').single();
  if (error || !data) {
    res.status(500).json({ message: 'Failed to create applicant profile' });
    return;
  }

  res.status(201).json({ applicant: mapApplicant(data) });
});

router.patch('/:id', async (req: Request<{ id: string }, unknown, ApplicantUpdateDto>, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ message: 'Invalid applicant id' });
    return;
  }

  const { name, title, bio, skills, resumeUrl } = req.body ?? {};
  const updates: Record<string, unknown> = {};

  if (typeof name === 'string') {
    const trimmedName = name.trim();
    if (!trimmedName) {
      res.status(400).json({ message: 'name cannot be empty' });
      return;
    }
    updates.Name = trimmedName;
    updates.Initials = buildInitials(trimmedName);
    updates.AvatarColor = pickAvatarColor(trimmedName);
  }

  if (typeof title === 'string') {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      res.status(400).json({ message: 'title cannot be empty' });
      return;
    }
    updates.Title = trimmedTitle;
  }

  if (typeof bio === 'string') {
    updates.Bio = bio.trim();
  }

  if (Array.isArray(skills)) {
    updates.Skills = toCsv(skills);
  }

  if (typeof resumeUrl === 'string') {
    updates.ResumeUrl = resumeUrl.trim();
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ message: 'No valid fields provided for update' });
    return;
  }

  const { data, error } = await supabase.from('Applicants').update(updates).eq('Id', id).select('*').single();
  if (error || !data) {
    res.status(500).json({ message: 'Failed to update applicant profile' });
    return;
  }

  res.json({ applicant: mapApplicant(data) });
});

router.post('/:id/resume', upload.single('resume'), async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ message: 'Invalid applicant id' });
    return;
  }

  if (!req.file) {
    res.status(400).json({ message: 'Resume file is required' });
    return;
  }

  const resumeUrl = `/uploads/resumes/${req.file.filename}`;
  const { data, error } = await supabase
    .from('Applicants')
    .update({ ResumeUrl: resumeUrl })
    .eq('Id', id)
    .select('*')
    .single();

  if (error || !data) {
    res.status(500).json({ message: 'Failed to upload resume' });
    return;
  }

  res.json({ applicant: mapApplicant(data) });
});

router.delete('/:id/resume', async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ message: 'Invalid applicant id' });
    return;
  }

  const { data, error } = await supabase
    .from('Applicants')
    .update({ ResumeUrl: null })
    .eq('Id', id)
    .select('*')
    .single();
  if (error || !data) {
    res.status(500).json({ message: 'Failed to remove resume' });
    return;
  }

  res.json({ applicant: mapApplicant(data) });
});

export default router;
