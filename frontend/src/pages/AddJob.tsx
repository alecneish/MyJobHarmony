import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/apiClient';

const EMPLOYMENT_TYPES = ['full-time', 'part-time', 'contract', 'internship', 'freelance'];

interface JobPosting {
  id: string;
  title: string;
  description: string | null;
  location: string;
  salary_range: string;
  employment_type: string;
  tags: string;
  status: string;
  created_at: string;
  companies?: { name: string };
}

export default function AddJob() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [employmentType, setEmploymentType] = useState('full-time');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('open');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setLoadingJobs(true);
    try {
      const res = await apiClient('/api/recruiter/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingJobs(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Job title is required.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await apiClient('/api/recruiter/jobs', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          location,
          salary_range: salaryRange,
          employment_type: employmentType,
          tags,
          company_name: companyName,
          status,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || 'Failed to create job posting.');
        return;
      }

      setSuccess('Job posting created successfully!');
      setTitle('');
      setDescription('');
      setLocation('');
      setSalaryRange('');
      setEmploymentType('full-time');
      setTags('');
      setStatus('open');

      loadJobs();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(jobId: string) {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    try {
      const res = await apiClient(`/api/recruiter/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
      }
    } catch {
      // silently fail
    }
  }

  async function handleToggleStatus(job: JobPosting) {
    const newStatus = job.status === 'open' ? 'closed' : 'open';

    try {
      const res = await apiClient(`/api/recruiter/jobs/${job.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j)),
        );
      }
    } catch {
      // silently fail
    }
  }

  const hasCompany = !!userProfile?.company_id;

  return (
    <div className="jh-addjob-container">
      {/* ── Page Header ── */}
      <header className="jh-addjob-header">
        <h2>New Job Posting</h2>
        <p>Fill out the details below to publish a new position.</p>
      </header>

      {/* ── Feedback ── */}
      {error && <div className="jh-auth-error">{error}</div>}
      {success && <div className="jh-addjob-success">{success}</div>}

      {/* ── Form Card ── */}
      <form onSubmit={handleSubmit} className="jh-addjob-card">
        {/* Title */}
        <div className="jh-field">
          <label htmlFor="job-title">Job Title <span className="jh-required">*</span></label>
          <input
            id="job-title"
            className="jh-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Frontend Developer"
            required
          />
        </div>

        {/* Company (only if none yet) */}
        {!hasCompany && (
          <div className="jh-field">
            <label htmlFor="company-name">Company Name</label>
            <input
              id="company-name"
              className="jh-input"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Corp"
            />
            <span className="jh-field-hint">Creates your company profile. Only needed once.</span>
          </div>
        )}

        {/* Description */}
        <div className="jh-field">
          <label htmlFor="job-description">Description</label>
          <textarea
            id="job-description"
            className="jh-input jh-addjob-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the role, responsibilities, and requirements..."
            rows={5}
          />
        </div>

        {/* 2-col row: Location + Salary */}
        <div className="jh-addjob-row">
          <div className="jh-field">
            <label htmlFor="job-location">Location</label>
            <input
              id="job-location"
              className="jh-input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote, New York, NY"
            />
          </div>
          <div className="jh-field">
            <label htmlFor="job-salary">Salary Range</label>
            <input
              id="job-salary"
              className="jh-input"
              type="text"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              placeholder="e.g. $80k - $120k"
            />
          </div>
        </div>

        {/* 2-col row: Type + Status */}
        <div className="jh-addjob-row">
          <div className="jh-field">
            <label htmlFor="job-type">Employment Type</label>
            <select
              id="job-type"
              className="jh-input"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="jh-field">
            <label htmlFor="job-status">Status</label>
            <select
              id="job-status"
              className="jh-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className="jh-field">
          <label htmlFor="job-tags">Tags</label>
          <input
            id="job-tags"
            className="jh-input"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="React, TypeScript, Remote-friendly"
          />
          <span className="jh-field-hint">Comma-separated. Helps candidates discover this posting.</span>
        </div>

        {/* Actions */}
        <div className="jh-addjob-actions">
          <button type="submit" className="jh-btn-primary" disabled={submitting}>
            {submitting ? 'Publishing...' : 'Publish Posting'}
          </button>
          <button type="button" className="jh-btn-outline" onClick={() => navigate('/recruiter/dashboard')}>
            Cancel
          </button>
        </div>
      </form>

      {/* ── Existing Jobs ── */}
      {!loadingJobs && jobs.length > 0 && (
        <section className="jh-addjob-list-section">
          <h3>Your Postings</h3>

          <div className="jh-addjob-list">
            {jobs.map((job) => (
              <div key={job.id} className="jh-manage-job-card">
                <div className="jh-manage-job-header">
                  <div>
                    <h4>{job.title}</h4>
                    <p className="jh-manage-job-meta">
                      {job.companies?.name || 'Your Company'} &middot; {job.location || 'No location'} &middot; {job.employment_type}
                      {job.salary_range ? ` &middot; ${job.salary_range}` : ''}
                    </p>
                  </div>
                  <span className={`jh-status-badge jh-status-${job.status}`}>
                    {job.status}
                  </span>
                </div>

                {job.tags && (
                  <div className="jh-tag-list">
                    {job.tags.split(',').filter(Boolean).map((tag) => (
                      <span key={tag.trim()} className="jh-tag">{tag.trim()}</span>
                    ))}
                  </div>
                )}

                <div className="jh-manage-job-actions">
                  <button className="jh-btn-secondary" onClick={() => handleToggleStatus(job)}>
                    {job.status === 'open' ? 'Close' : 'Reopen'}
                  </button>
                  <button className="jh-btn-danger" onClick={() => handleDelete(job.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loadingJobs && jobs.length === 0 && (
        <p className="jh-addjob-empty">No postings yet. Create your first one above.</p>
      )}
    </div>
  );
}
