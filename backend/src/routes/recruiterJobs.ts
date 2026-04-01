import { Router, Request, Response } from 'express';
import { supabase } from '../db/database';
import type { AuthenticatedRequest } from '../middleware';

const router = Router();

/**
 * GET /api/recruiter/jobs
 * List job postings owned by the authenticated recruiter.
 */
router.get('/', async (req: Request, res: Response) => {
  const { authUser } = req as AuthenticatedRequest;
  if (!authUser) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { data, error } = await supabase
    .from('job_postings')
    .select('*, companies(name)')
    .eq('recruiter_id', authUser.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to list recruiter jobs:', error);
    res.status(500).json({ error: 'Failed to load job postings' });
    return;
  }

  res.json(data ?? []);
});

/**
 * POST /api/recruiter/jobs
 * Create a new job posting. Auto-creates a company if the recruiter
 * doesn't have one yet (uses company_name from the request body).
 */
router.post('/', async (req: Request, res: Response) => {
  const { authUser, userProfile } = req as AuthenticatedRequest;
  if (!authUser || !userProfile) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const {
    title,
    description,
    location,
    salary_range,
    employment_type,
    tags,
    company_name,
    status,
  } = req.body;

  if (!title || !title.trim()) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  try {
    // Resolve or create company
    let companyId = userProfile.company_id;

    if (!companyId) {
      const name = (company_name || '').trim() || `${authUser.email}'s Company`;

      const { data: company, error: companyErr } = await supabase
        .from('companies')
        .insert({ name, owner_id: authUser.id })
        .select('id')
        .single();

      if (companyErr || !company) {
        console.error('Failed to create company:', companyErr);
        res.status(500).json({ error: 'Failed to create company' });
        return;
      }

      companyId = company.id;

      // Link the company to the recruiter's profile
      await supabase
        .from('user_profiles')
        .update({ company_id: companyId })
        .eq('id', authUser.id);
    }

    const { data: job, error: jobErr } = await supabase
      .from('job_postings')
      .insert({
        recruiter_id: authUser.id,
        company_id: companyId,
        title: title.trim(),
        description: (description || '').trim() || null,
        location: (location || '').trim(),
        salary_range: (salary_range || '').trim(),
        employment_type: employment_type || 'full-time',
        tags: (tags || '').trim(),
        status: status || 'open',
      })
      .select('*')
      .single();

    if (jobErr || !job) {
      console.error('Failed to create job posting:', jobErr);
      res.status(500).json({ error: 'Failed to create job posting' });
      return;
    }

    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job posting:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PATCH /api/recruiter/jobs/:id
 * Update a job posting owned by the authenticated recruiter.
 */
router.patch('/:id', async (req: Request, res: Response) => {
  const { authUser } = req as AuthenticatedRequest;
  if (!authUser) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const jobId = req.params.id;

  const allowedFields = [
    'title', 'description', 'location', 'salary_range',
    'employment_type', 'tags', 'status', 'personality_type',
  ];

  const updates: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: 'No valid fields to update' });
    return;
  }

  const { data, error } = await supabase
    .from('job_postings')
    .update(updates)
    .eq('id', jobId)
    .eq('recruiter_id', authUser.id)
    .select('*')
    .single();

  if (error) {
    console.error('Failed to update job posting:', error);
    res.status(500).json({ error: 'Failed to update job posting' });
    return;
  }

  if (!data) {
    res.status(404).json({ error: 'Job posting not found or not owned by you' });
    return;
  }

  res.json(data);
});

/**
 * DELETE /api/recruiter/jobs/:id
 * Delete a job posting owned by the authenticated recruiter.
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const { authUser } = req as AuthenticatedRequest;
  if (!authUser) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const jobId = req.params.id;

  const { error, count } = await supabase
    .from('job_postings')
    .delete({ count: 'exact' })
    .eq('id', jobId)
    .eq('recruiter_id', authUser.id);

  if (error) {
    console.error('Failed to delete job posting:', error);
    res.status(500).json({ error: 'Failed to delete job posting' });
    return;
  }

  if (count === 0) {
    res.status(404).json({ error: 'Job posting not found or not owned by you' });
    return;
  }

  res.json({ success: true });
});

export default router;
