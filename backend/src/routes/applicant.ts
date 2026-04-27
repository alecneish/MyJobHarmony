import { Router, Request, Response } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { supabase } from '../db/database';
import {
  Applicant,
  ApplicantCreateDto,
  ApplicantEducationEntry,
  ApplicantUpdateDto,
  ApplicantWorkExperienceEntry,
} from '../types';

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
const PROFILE_META_MARKER = '[JH_PROFILE_META]';

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

type ProfileMeta = {
  location?: string;
  yearsOfExperience?: number;
  linkedinUrl?: string;
  education?: ApplicantEducationEntry[];
  workExperience?: ApplicantWorkExperienceEntry[];
};

function extractProfileMeta(rawBio: unknown): { plainBio: string; meta: ProfileMeta } {
  const bio = typeof rawBio === 'string' ? rawBio : '';
  const markerIndex = bio.lastIndexOf(PROFILE_META_MARKER);
  if (markerIndex < 0) return { plainBio: bio.trim(), meta: {} };

  const plainBio = bio.slice(0, markerIndex).trim();
  const jsonPart = bio.slice(markerIndex + PROFILE_META_MARKER.length).trim();

  try {
    const parsed = JSON.parse(jsonPart) as ProfileMeta;
    return {
      plainBio,
      meta: {
        location: typeof parsed.location === 'string' ? parsed.location : undefined,
        yearsOfExperience:
          typeof parsed.yearsOfExperience === 'number' && Number.isFinite(parsed.yearsOfExperience)
            ? parsed.yearsOfExperience
            : undefined,
        linkedinUrl: typeof parsed.linkedinUrl === 'string' ? parsed.linkedinUrl : undefined,
        education: Array.isArray(parsed.education)
          ? (parsed.education as ApplicantEducationEntry[])
          : [],
        workExperience: Array.isArray(parsed.workExperience)
          ? (parsed.workExperience as ApplicantWorkExperienceEntry[])
          : [],
      },
    };
  } catch {
    return { plainBio: bio.trim(), meta: {} };
  }
}

function encodeProfileMeta(plainBio: string, meta: ProfileMeta): string {
  const normalizedMeta: ProfileMeta = {
    location: typeof meta.location === 'string' ? meta.location.trim() : '',
    yearsOfExperience:
      typeof meta.yearsOfExperience === 'number' && Number.isFinite(meta.yearsOfExperience)
        ? Math.max(0, Math.round(meta.yearsOfExperience))
        : undefined,
    linkedinUrl: typeof meta.linkedinUrl === 'string' ? meta.linkedinUrl.trim() : '',
    education: Array.isArray(meta.education) ? meta.education : [],
    workExperience: Array.isArray(meta.workExperience) ? meta.workExperience : [],
  };

  return `${plainBio.trim()}\n\n${PROFILE_META_MARKER}${JSON.stringify(normalizedMeta)}`.trim();
}

function mapApplicant(row: any): Applicant {
  const { plainBio, meta } = extractProfileMeta(row.Bio ?? row.description ?? '');
  const rowEducation = Array.isArray(row.Education)
    ? (row.Education as ApplicantEducationEntry[])
    : Array.isArray(row.education)
      ? (row.education as ApplicantEducationEntry[])
      : [];
  const rowWorkExperience = Array.isArray(row.WorkExperience)
    ? (row.WorkExperience as ApplicantWorkExperienceEntry[])
    : Array.isArray(row.work_experience)
      ? (row.work_experience as ApplicantWorkExperienceEntry[])
      : [];
  const education = rowEducation.length ? rowEducation : meta.education ?? [];
  const workExperience = rowWorkExperience.length ? rowWorkExperience : meta.workExperience ?? [];
  const rowLocation = row.Location ?? row.location;
  const rowYears = row.YearsOfExperience ?? row.years_of_experience;
  const rowLinkedIn = row.LinkedInUrl ?? row.linkedin_url;

  return {
    id: row.Id ?? row.id,
    name: row.Name ?? row.full_name ?? '',
    initials: row.Initials ?? row.initials ?? '',
    avatarColor: row.AvatarColor ?? row.avatar_color ?? '',
    bio: plainBio || undefined,
    resumeUrl: row.ResumeUrl ?? row.resume_url ?? undefined,
    location: (typeof rowLocation === 'string' ? rowLocation : meta.location) ?? undefined,
    yearsOfExperience:
      (typeof rowYears === 'number' && Number.isFinite(rowYears) ? rowYears : meta.yearsOfExperience) ??
      undefined,
    linkedinUrl: (typeof rowLinkedIn === 'string' ? rowLinkedIn : meta.linkedinUrl) ?? undefined,
    education,
    workExperience,
    resumeFitPercent: row.ResumeFitPercent ?? row.resume_fit_percent ?? 0,
    personalityFitPercent: row.PersonalityFitPercent ?? row.personality_fit_percent ?? 0,
    skills: splitCsv(row.Skills ?? row.skills),
    isRecommended: Boolean(row.IsRecommended ?? row.is_recommended),
    title: row.Title ?? row.professional_title ?? '',
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
  const { id: rawId, name, title, bio, skills, resumeUrl, location, yearsOfExperience, linkedinUrl, education, workExperience } = (req.body ?? {}) as ApplicantCreateDto & { id?: number };
  const trimmedName = name?.trim();
  const trimmedTitle = title?.trim();

  if (!trimmedName || !trimmedTitle || !Array.isArray(skills)) {
    res.status(400).json({
      message: 'name, title, and skills are required',
    });
    return;
  }

  const requestedId =
    typeof rawId === 'number' && Number.isInteger(rawId) && rawId > 0 ? rawId : null;

  const payload = {
    ...(requestedId ? { Id: requestedId } : {}),
    Name: trimmedName,
    Initials: buildInitials(trimmedName),
    AvatarColor: pickAvatarColor(trimmedName),
    Bio: encodeProfileMeta(typeof bio === 'string' ? bio.trim() : '', {
      location,
      yearsOfExperience: typeof yearsOfExperience === 'number' ? yearsOfExperience : undefined,
      linkedinUrl,
      education: Array.isArray(education) ? education : [],
      workExperience: Array.isArray(workExperience) ? workExperience : [],
    }),
    ResumeUrl: typeof resumeUrl === 'string' ? resumeUrl.trim() : null,
    ResumeFitPercent: 0,
    PersonalityFitPercent: 0,
    Skills: toCsv(skills),
    IsRecommended: 1,
    Title: trimmedTitle,
  };

  const { data, error } = await supabase
    .from('Applicants')
    .upsert(payload, { onConflict: 'Id' })
    .select('*')
    .single();
  if (error || !data) {
    console.error('Failed to create applicant profile:', error);
    res.status(500).json({ message: `Failed to create applicant profile (${error?.message ?? 'unknown'})` });
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

  const { name, title, bio, skills, resumeUrl, location, yearsOfExperience, linkedinUrl, education, workExperience } = req.body ?? {};
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

  const hasMetaUpdates =
    typeof location === 'string' ||
    typeof yearsOfExperience === 'number' ||
    typeof linkedinUrl === 'string' ||
    Array.isArray(education) ||
    Array.isArray(workExperience);

  if (typeof bio === 'string' || hasMetaUpdates) {
    let baseBio = typeof bio === 'string' ? bio.trim() : '';
    let baseMeta: ProfileMeta = {};

    if (typeof bio !== 'string' && hasMetaUpdates) {
      const { data: existing } = await supabase.from('Applicants').select('*').eq('Id', id).maybeSingle();
      if (existing) {
        const parsed = extractProfileMeta(existing.Bio ?? '');
        baseBio = parsed.plainBio;
        baseMeta = parsed.meta;
      }
    }

    updates.Bio = encodeProfileMeta(baseBio, {
      location: typeof location === 'string' ? location : baseMeta.location,
      yearsOfExperience:
        typeof yearsOfExperience === 'number' && Number.isFinite(yearsOfExperience)
          ? yearsOfExperience
          : baseMeta.yearsOfExperience,
      linkedinUrl: typeof linkedinUrl === 'string' ? linkedinUrl : baseMeta.linkedinUrl,
      education: Array.isArray(education) ? education : baseMeta.education ?? [],
      workExperience: Array.isArray(workExperience)
        ? workExperience
        : baseMeta.workExperience ?? [],
    });
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
    console.error('Failed to update applicant profile:', error);
    res.status(500).json({ message: `Failed to update applicant profile (${error?.message ?? 'unknown'})` });
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
