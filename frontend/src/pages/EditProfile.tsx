import { useEffect, useMemo, useState } from 'react';
import { Applicant } from '../types';
import {
  createApplicant,
  deleteResume,
  getApplicant,
  updateApplicant,
  uploadResume,
} from '../lib/applicantApi';
import type { ApplicantUpsertPayload } from '../lib/applicantApi';

const DEFAULT_APPLICANT_ID = 1;

type FormState = {
  name: string;
  title: string;
  bio: string;
  skills: string;
};

function toFormState(applicant: Applicant): FormState {
  return {
    name: applicant.name ?? '',
    title: applicant.title ?? '',
    bio: applicant.bio ?? '',
    skills: (applicant.skills ?? []).join(', '),
  };
}

function toPayload(form: FormState): ApplicantUpsertPayload {
  return {
    name: form.name.trim(),
    title: form.title.trim(),
    bio: form.bio.trim(),
    skills: form.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

export default function EditProfile() {
  const [applicantId, setApplicantId] = useState<number>(DEFAULT_APPLICANT_ID);
  const [currentApplicant, setCurrentApplicant] = useState<Applicant | null>(null);
  const [form, setForm] = useState<FormState>({ name: '', title: '', bio: '', skills: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = Number(localStorage.getItem('applicantId') ?? DEFAULT_APPLICANT_ID);
    if (Number.isInteger(stored) && stored > 0) {
      setApplicantId(stored);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const applicant = await getApplicant(applicantId);
        if (cancelled) return;
        if (applicant) {
          setCurrentApplicant(applicant);
          setForm(toFormState(applicant));
        } else {
          setCurrentApplicant(null);
          setForm({ name: '', title: '', bio: '', skills: '' });
        }
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load profile');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applicantId]);

  const canSave = useMemo(
    () => form.name.trim().length > 0 && form.title.trim().length > 0 && !saving,
    [form.name, form.title, saving],
  );

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    try {
      setSaving(true);
      setMessage(null);
      setError(null);

      const payload = toPayload(form);
      if (!payload.skills.length) {
        setError('Please add at least one skill.');
        return;
      }

      let applicant = currentApplicant
        ? await updateApplicant(currentApplicant.id, payload)
        : await createApplicant(payload);

      if (selectedFile) {
        applicant = await uploadResume(applicant.id, selectedFile);
        setSelectedFile(null);
      }

      setCurrentApplicant(applicant);
      setForm(toFormState(applicant));
      setApplicantId(applicant.id);
      localStorage.setItem('applicantId', String(applicant.id));
      setMessage('Profile saved successfully.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  async function handleRemoveResume() {
    if (!currentApplicant) return;
    try {
      setSaving(true);
      setError(null);
      setMessage(null);
      const applicant = await deleteResume(currentApplicant.id);
      setCurrentApplicant(applicant);
      setMessage('Resume removed successfully.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to remove resume');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="jh-profile-container">
      <div className="jh-section-header" style={{ marginBottom: '1.5rem' }}>
        <h2>Edit Profile</h2>
        <p>Manage your profile details and resume for better job matching.</p>
      </div>

      <div className="jh-profile-card">
        {loading ? (
          <p>Loading profile...</p>
        ) : (
          <>
            {error && <div className="jh-auth-error">{error}</div>}
            {message && <p className="jh-success-note">{message}</p>}

            <div className="jh-field">
              <label htmlFor="profile-name">Full name</label>
              <input
                id="profile-name"
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Jane Doe"
              />
            </div>

            <div className="jh-field">
              <label htmlFor="profile-title">Professional title</label>
              <input
                id="profile-title"
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Frontend Developer"
              />
            </div>

            <div className="jh-field">
              <label htmlFor="profile-bio">Description</label>
              <textarea
                id="profile-bio"
                rows={4}
                value={form.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                placeholder="Share your background and career goals..."
              />
            </div>

            <div className="jh-field">
              <label htmlFor="profile-skills">Skills (comma-separated)</label>
              <input
                id="profile-skills"
                type="text"
                value={form.skills}
                onChange={(e) => updateField('skills', e.target.value)}
                placeholder="React, TypeScript, UI Design"
              />
            </div>

            <div className="jh-field">
              <label htmlFor="profile-resume">Resume (PDF/DOC)</label>
              <input
                id="profile-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              />
              {selectedFile && <small>Selected: {selectedFile.name}</small>}
            </div>

            {(currentApplicant?.resumeUrl ?? '').length > 0 && (
              <div className="jh-profile-resume-row">
                <a href={currentApplicant?.resumeUrl} target="_blank" rel="noreferrer">
                  View current resume
                </a>
                <button className="jh-btn-secondary" onClick={handleRemoveResume} disabled={saving}>
                  Remove Resume
                </button>
              </div>
            )}

            <div className="jh-form-actions">
              <button className="jh-btn-primary" onClick={handleSave} disabled={!canSave}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
