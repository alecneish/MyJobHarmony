import { Applicant } from '../types';

export interface ApplicantUpsertPayload {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  resumeUrl?: string;
}

interface ApplicantResponse {
  applicant: Applicant;
}

async function parseError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string };
    if (data?.message) return data.message;
  } catch {
    // Ignore parse failure and fallback below.
  }
  return `Request failed (${response.status})`;
}

export async function getApplicant(id: number): Promise<Applicant | null> {
  const response = await fetch(`/api/applicant/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as ApplicantResponse;
  return data.applicant;
}

export async function createApplicant(payload: ApplicantUpsertPayload): Promise<Applicant> {
  const response = await fetch('/api/applicant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as ApplicantResponse;
  return data.applicant;
}

export async function updateApplicant(id: number, payload: ApplicantUpsertPayload): Promise<Applicant> {
  const response = await fetch(`/api/applicant/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as ApplicantResponse;
  return data.applicant;
}

export async function uploadResume(id: number, file: File): Promise<Applicant> {
  const form = new FormData();
  form.append('resume', file);

  const response = await fetch(`/api/applicant/${id}/resume`, {
    method: 'POST',
    body: form,
  });
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as ApplicantResponse;
  return data.applicant;
}

export async function deleteResume(id: number): Promise<Applicant> {
  const response = await fetch(`/api/applicant/${id}/resume`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as ApplicantResponse;
  return data.applicant;
}
