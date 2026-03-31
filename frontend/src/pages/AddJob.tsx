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
    <div className="jh-recruit-container">
      <div className="jh-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Manage Job Postings</h2>
        <p>Create and manage your job listings.</p>
      </div>

      {/* ── Create Form ── */}
      <div className="jh-auth-card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>Create New Posting</h3>

        {error && (
          <div className="jh-form-error" style={{ marginBottom: '1rem', color: 'var(--jh-danger)', background: 'var(--jh-danger-bg, #fef2f2)', padding: '0.75rem 1rem', borderRadius: 'var(--jh-radius-md)' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ marginBottom: '1rem', color: 'var(--jh-success, #16a34a)', background: '#f0fdf4', padding: '0.75rem 1rem', borderRadius: 'var(--jh-radius-md)' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="jh-add-job-form">
          <div className="jh-form-row">
            <label className="jh-form-label" htmlFor="job-title">Job Title *</label>
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

          {!hasCompany && (
            <div className="jh-form-row">
              <label className="jh-form-label" htmlFor="company-name">Company Name</label>
              <input
                id="company-name"
                className="jh-input"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corp"
              />
              <small className="jh-form-hint">This will create your company profile. Only needed once.</small>
            </div>
          )}

          <div className="jh-form-row">
            <label className="jh-form-label" htmlFor="job-description">Description</label>
            <textarea
              id="job-description"
              className="jh-input jh-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={5}
            />
          </div>

          <div className="jh-form-grid-2">
            <div className="jh-form-row">
              <label className="jh-form-label" htmlFor="job-location">Location</label>
              <input
                id="job-location"
                className="jh-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote, New York, NY"
              />
            </div>

            <div className="jh-form-row">
              <label className="jh-form-label" htmlFor="job-salary">Salary Range</label>
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

          <div className="jh-form-grid-2">
            <div className="jh-form-row">
              <label className="jh-form-label" htmlFor="job-type">Employment Type</label>
              <select
                id="job-type"
                className="jh-input jh-select"
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

            <div className="jh-form-row">
              <label className="jh-form-label" htmlFor="job-status">Status</label>
              <select
                id="job-status"
                className="jh-input jh-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="jh-form-row">
            <label className="jh-form-label" htmlFor="job-tags">Tags</label>
            <input
              id="job-tags"
              className="jh-input"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. React, TypeScript, Remote-friendly (comma-separated)"
            />
            <small className="jh-form-hint">Comma-separated tags to help candidates find this posting.</small>
          </div>

          <div className="jh-form-actions" style={{ marginTop: '1.5rem' }}>
            <button type="submit" className="jh-btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Job Posting'}
            </button>
            <button type="button" className="jh-btn-outline" onClick={() => navigate('/recruiter/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>

      {/* ── Existing Jobs List ── */}
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Your Job Postings</h3>

        {loadingJobs ? (
          <p style={{ color: 'var(--jh-gray-500)' }}>Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="jh-empty-state">
            <p>You haven't created any job postings yet.</p>
          </div>
        ) : (
          <div className="jh-job-list">
            {jobs.map((job) => (
              <div key={job.id} className="jh-manage-job-card">
                <div className="jh-manage-job-header">
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{job.title}</h4>
                    <p style={{ margin: '0.25rem 0 0', color: 'var(--jh-gray-600)', fontSize: '0.9rem' }}>
                      {job.companies?.name || 'Your Company'} &middot; {job.location || 'No location'} &middot; {job.employment_type}
                    </p>
                  </div>
                  <span className={`jh-status-badge jh-status-${job.status}`}>
                    {job.status}
                  </span>
                </div>

                {job.salary_range && (
                  <p style={{ margin: '0.5rem 0 0', color: 'var(--jh-gray-700)', fontSize: '0.9rem' }}>
                    {job.salary_range}
                  </p>
                )}

                {job.tags && (
                  <div className="jh-tag-list" style={{ marginTop: '0.75rem' }}>
                    {job.tags.split(',').filter(Boolean).map((tag) => (
                      <span key={tag.trim()} className="jh-tag">{tag.trim()}</span>
                    ))}
                  </div>
                )}

                <div className="jh-manage-job-actions">
                  <button
                    className="jh-btn-secondary"
                    onClick={() => handleToggleStatus(job)}
                  >
                    {job.status === 'open' ? 'Close' : 'Reopen'}
                  </button>
                  <button
                    className="jh-btn-danger"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
