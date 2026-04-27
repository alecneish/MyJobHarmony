import { useEffect, useMemo, useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import {
  Applicant,
  ApplicantEducationEntry,
  ApplicantWorkExperienceEntry,
} from '../types';
import {
  deleteResume,
  getApplicant,
  upsertApplicant,
  uploadResume,
} from '../lib/applicantApi';
import type { ApplicantUpsertPayload } from '../lib/applicantApi';

const DEFAULT_APPLICANT_ID = 1;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY?.trim();

GlobalWorkerOptions.workerSrc = pdfWorker;

type FormState = {
  name: string;
  title: string;
  location: string;
  yearsOfExperience: string;
  linkedinUrl: string;
  bio: string;
  skills: string;
  education: ApplicantEducationEntry[];
  workExperience: ApplicantWorkExperienceEntry[];
};

type ParsedResumeData = {
  full_name?: string;
  job_title?: string;
  location?: string;
  years_of_experience?: number | string;
  skills?: string[];
  education?: Array<{
    school?: string;
    degree?: string;
    field_of_study?: string;
    start_year?: string | number;
    end_year?: string | number;
  }>;
  work_experience?: Array<{
    company?: string;
    title?: string;
    location?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
  }>;
  bio?: string;
  linkedin_url?: string;
};

function toFormState(applicant: Applicant): FormState {
  return {
    name: applicant.name ?? '',
    title: applicant.title ?? '',
    location: applicant.location ?? '',
    yearsOfExperience:
      applicant.yearsOfExperience != null ? String(applicant.yearsOfExperience) : '',
    linkedinUrl: applicant.linkedinUrl ?? '',
    bio: applicant.bio ?? '',
    skills: (applicant.skills ?? []).join(', '),
    education: applicant.education ?? [],
    workExperience: applicant.workExperience ?? [],
  };
}

function toPayload(form: FormState): ApplicantUpsertPayload {
  const years = Number.parseInt(form.yearsOfExperience, 10);

  return {
    name: form.name.trim(),
    title: form.title.trim(),
    location: form.location.trim(),
    yearsOfExperience: Number.isFinite(years) ? years : undefined,
    linkedinUrl: form.linkedinUrl.trim(),
    bio: form.bio.trim(),
    skills: form.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    education: form.education
      .map((entry) => ({
        school: (entry.school ?? '').trim(),
        degree: (entry.degree ?? '').trim(),
        fieldOfStudy: (entry.fieldOfStudy ?? '').trim(),
        startYear: (entry.startYear ?? '').trim(),
        endYear: (entry.endYear ?? '').trim(),
      }))
      .filter((entry) => entry.school || entry.degree),
    workExperience: form.workExperience
      .map((entry) => ({
        company: (entry.company ?? '').trim(),
        title: (entry.title ?? '').trim(),
        location: (entry.location ?? '').trim(),
        startDate: (entry.startDate ?? '').trim(),
        endDate: (entry.endDate ?? '').trim(),
        description: (entry.description ?? '').trim(),
      }))
      .filter((entry) => entry.company || entry.title),
  };
}

function blankEducationEntry(): ApplicantEducationEntry {
  return {
    school: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
  };
}

function blankWorkExperienceEntry(): ApplicantWorkExperienceEntry {
  return {
    company: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  };
}

function hasAnyProfileValue(form: FormState): boolean {
  if (form.name.trim() || form.title.trim() || form.location.trim() || form.yearsOfExperience.trim()) {
    return true;
  }
  if (form.linkedinUrl.trim() || form.bio.trim() || form.skills.trim()) {
    return true;
  }
  if (form.education.some((entry) => Object.values(entry).some((value) => (value ?? '').trim()))) {
    return true;
  }
  if (form.workExperience.some((entry) => Object.values(entry).some((value) => (value ?? '').trim()))) {
    return true;
  }
  return false;
}

async function extractTextFromPdf(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(buffer) }).promise;
  const pages: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const text = await page.getTextContent();
    const lines = text.items
      .map((item: any) => (typeof item?.str === 'string' ? item.str : ''))
      .join(' ')
      .trim();
    if (lines) pages.push(lines);
  }

  return pages.join('\n').trim();
}

function parseJsonFromModel(content: string): ParsedResumeData {
  const cleaned = content.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/, '');
  return JSON.parse(cleaned) as ParsedResumeData;
}

function normalizeParsedData(parsed: ParsedResumeData): FormState {
  const skills = Array.isArray(parsed.skills)
    ? parsed.skills.map((skill) => String(skill).trim()).filter(Boolean)
    : [];

  const education = Array.isArray(parsed.education)
    ? parsed.education
        .map((entry) => ({
          school: String(entry?.school ?? '').trim(),
          degree: String(entry?.degree ?? '').trim(),
          fieldOfStudy: String(entry?.field_of_study ?? '').trim(),
          startYear: String(entry?.start_year ?? '').trim(),
          endYear: String(entry?.end_year ?? '').trim(),
        }))
        .filter((entry) => entry.school || entry.degree)
    : [];

  const workExperience = Array.isArray(parsed.work_experience)
    ? parsed.work_experience
        .map((entry) => ({
          company: String(entry?.company ?? '').trim(),
          title: String(entry?.title ?? '').trim(),
          location: String(entry?.location ?? '').trim(),
          startDate: String(entry?.start_date ?? '').trim(),
          endDate: String(entry?.end_date ?? '').trim(),
          description: String(entry?.description ?? '').trim(),
        }))
        .filter((entry) => entry.company || entry.title || entry.description)
    : [];

  return {
    name: String(parsed.full_name ?? '').trim(),
    title: String(parsed.job_title ?? '').trim(),
    location: String(parsed.location ?? '').trim(),
    yearsOfExperience:
      parsed.years_of_experience != null ? String(parsed.years_of_experience).trim() : '',
    linkedinUrl: String(parsed.linkedin_url ?? '').trim(),
    bio: String(parsed.bio ?? '').trim(),
    skills: skills.join(', '),
    education,
    workExperience,
  };
}

async function parseResumeWithOpenAI(resumeText: string): Promise<FormState> {
  if (!OPENAI_API_KEY) {
    throw new Error('VITE_OPENAI_API_KEY is not set.');
  }

  const prompt = [
    'You are a resume parser.',
    'Extract profile data from the resume text.',
    'Return ONLY valid JSON with this exact schema:',
    '{',
    '  "full_name": string,',
    '  "job_title": string,',
    '  "location": string,',
    '  "years_of_experience": number,',
    '  "skills": string[],',
    '  "education": [{"school": string, "degree": string, "field_of_study": string, "start_year": string, "end_year": string}],',
    '  "work_experience": [{"company": string, "title": string, "location": string, "start_date": string, "end_date": string, "description": string}],',
    '  "bio": string,',
    '  "linkedin_url": string',
    '}',
    'Rules:',
    '- Do not guess.',
    '- If data is missing, use empty string, 0, or empty array.',
    '- Keep values concise and factual.',
    '',
    'Resume text:',
    resumeText,
  ].join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as any;
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('OpenAI returned an empty response.');
  }

  return normalizeParsedData(parseJsonFromModel(content));
}

export default function EditProfile() {
  return <CandidateEditProfile />;
}

/** Candidate / job-seeker profile editor */
function CandidateEditProfile() {
  const [applicantId, setApplicantId] = useState<number>(DEFAULT_APPLICANT_ID);
  const [currentApplicant, setCurrentApplicant] = useState<Applicant | null>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    title: '',
    location: '',
    yearsOfExperience: '',
    linkedinUrl: '',
    bio: '',
    skills: '',
    education: [],
    workExperience: [],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [parsingResume, setParsingResume] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autofillMessage, setAutofillMessage] = useState<string | null>(null);

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
          setForm({
            name: '',
            title: '',
            location: '',
            yearsOfExperience: '',
            linkedinUrl: '',
            bio: '',
            skills: '',
            education: [],
            workExperience: [],
          });
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
    () => form.name.trim().length > 0 && form.title.trim().length > 0 && !saving && !parsingResume,
    [form.name, form.title, saving, parsingResume],
  );

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateEducationField<K extends keyof ApplicantEducationEntry>(
    index: number,
    field: K,
    value: ApplicantEducationEntry[K],
  ) {
    setForm((prev) => {
      const next = [...prev.education];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, education: next };
    });
  }

  function updateWorkExperienceField<K extends keyof ApplicantWorkExperienceEntry>(
    index: number,
    field: K,
    value: ApplicantWorkExperienceEntry[K],
  ) {
    setForm((prev) => {
      const next = [...prev.workExperience];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, workExperience: next };
    });
  }

  async function handleResumeSelected(file: File | null) {
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setSelectedFile(file);
      setError('Only PDF files can be auto-parsed. You can still upload and save manually.');
      setAutofillMessage(null);
      return;
    }

    if (hasAnyProfileValue(form)) {
      const confirmed = window.confirm(
        'Uploading a new resume will overwrite your current profile fields. Continue?',
      );
      if (!confirmed) return;
    }

    setSelectedFile(file);
    setError(null);
    setMessage(null);
    setAutofillMessage(null);
    setParsingResume(true);

    try {
      const resumeText = await extractTextFromPdf(file);
      if (!resumeText) {
        throw new Error('No readable text was found in this PDF.');
      }

      const parsed = await parseResumeWithOpenAI(resumeText);
      setForm(parsed);
      setAutofillMessage('Profile auto-filled from your resume - review and edit before saving.');
    } catch (e) {
      const reason = e instanceof Error ? e.message : 'Unknown error';
      if (reason.includes('OpenAI')) {
        setError('We could not auto-fill your profile right now. Please edit fields manually.');
      } else {
        setError('We could not read this PDF. Please fill out your profile manually.');
      }
      setAutofillMessage(null);
    } finally {
      setParsingResume(false);
    }
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

      const applicantPayload: ApplicantUpsertPayload = {
        ...payload,
        id: currentApplicant?.id ?? applicantId,
      };

      let applicant = await upsertApplicant(applicantPayload);

      if (selectedFile) {
        applicant = await uploadResume(applicant.id, selectedFile);
        setSelectedFile(null);
      }

      setCurrentApplicant(applicant);
      setForm(toFormState(applicant));
      setApplicantId(applicant.id);
      localStorage.setItem('applicantId', String(applicant.id));
      setMessage('Profile saved successfully.');
      setAutofillMessage(null);
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
      <div className="jh-section-header jh-section-header--regular">
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
            {autofillMessage && <p className="jh-info-note">{autofillMessage}</p>}
            {parsingResume && <p className="jh-muted-copy">Reading your resume...</p>}

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
              <label htmlFor="profile-location">Location</label>
              <input
                id="profile-location"
                type="text"
                value={form.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Austin, TX"
              />
            </div>

            <div className="jh-field">
              <label htmlFor="profile-experience">Years of experience</label>
              <input
                id="profile-experience"
                type="number"
                min={0}
                value={form.yearsOfExperience}
                onChange={(e) => updateField('yearsOfExperience', e.target.value)}
                placeholder="5"
              />
            </div>

            <div className="jh-field">
              <label htmlFor="profile-linkedin">LinkedIn URL</label>
              <input
                id="profile-linkedin"
                type="url"
                value={form.linkedinUrl}
                onChange={(e) => updateField('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/your-name"
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
                onChange={async (e) => {
                  const file = e.target.files?.[0] ?? null;
                  await handleResumeSelected(file);
                  e.currentTarget.value = '';
                }}
              />
              {selectedFile && <small>Selected: {selectedFile.name}</small>}
            </div>

            <div className="jh-profile-subsection">
              <div className="jh-profile-subsection-heading">
                <h3>Education</h3>
                <button
                  type="button"
                  className="jh-btn-secondary"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, education: [...prev.education, blankEducationEntry()] }))
                  }
                >
                  Add Education
                </button>
              </div>
              {form.education.length === 0 ? (
                <p className="jh-muted-copy">No education entries yet.</p>
              ) : (
                <div className="jh-profile-list">
                  {form.education.map((entry, index) => (
                    <div key={`edu-${index}`} className="jh-profile-list-item">
                      <div className="jh-field">
                        <label>School</label>
                        <input
                          type="text"
                          value={entry.school ?? ''}
                          onChange={(e) => updateEducationField(index, 'school', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>Degree</label>
                        <input
                          type="text"
                          value={entry.degree ?? ''}
                          onChange={(e) => updateEducationField(index, 'degree', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>Field of study</label>
                        <input
                          type="text"
                          value={entry.fieldOfStudy ?? ''}
                          onChange={(e) => updateEducationField(index, 'fieldOfStudy', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>Start year</label>
                        <input
                          type="text"
                          value={entry.startYear ?? ''}
                          onChange={(e) => updateEducationField(index, 'startYear', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>End year</label>
                        <input
                          type="text"
                          value={entry.endYear ?? ''}
                          onChange={(e) => updateEducationField(index, 'endYear', e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        className="jh-btn-secondary"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            education: prev.education.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="jh-profile-subsection">
              <div className="jh-profile-subsection-heading">
                <h3>Work Experience</h3>
                <button
                  type="button"
                  className="jh-btn-secondary"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      workExperience: [...prev.workExperience, blankWorkExperienceEntry()],
                    }))
                  }
                >
                  Add Experience
                </button>
              </div>
              {form.workExperience.length === 0 ? (
                <p className="jh-muted-copy">No work experience entries yet.</p>
              ) : (
                <div className="jh-profile-list">
                  {form.workExperience.map((entry, index) => (
                    <div key={`work-${index}`} className="jh-profile-list-item">
                      <div className="jh-field">
                        <label>Company</label>
                        <input
                          type="text"
                          value={entry.company ?? ''}
                          onChange={(e) => updateWorkExperienceField(index, 'company', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>Title</label>
                        <input
                          type="text"
                          value={entry.title ?? ''}
                          onChange={(e) => updateWorkExperienceField(index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>Location</label>
                        <input
                          type="text"
                          value={entry.location ?? ''}
                          onChange={(e) => updateWorkExperienceField(index, 'location', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>Start date</label>
                        <input
                          type="text"
                          value={entry.startDate ?? ''}
                          onChange={(e) => updateWorkExperienceField(index, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>End date</label>
                        <input
                          type="text"
                          value={entry.endDate ?? ''}
                          onChange={(e) => updateWorkExperienceField(index, 'endDate', e.target.value)}
                        />
                      </div>
                      <div className="jh-field">
                        <label>Description</label>
                        <textarea
                          rows={3}
                          value={entry.description ?? ''}
                          onChange={(e) =>
                            updateWorkExperienceField(index, 'description', e.target.value)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className="jh-btn-secondary"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            workExperience: prev.workExperience.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                {parsingResume ? 'Reading your resume...' : saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
