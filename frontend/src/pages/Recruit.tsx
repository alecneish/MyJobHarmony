import { useEffect, useMemo, useState } from 'react';
import { Applicant, RecruitApiResponse } from '../types';
import ApplicantCard from '../components/ApplicantCard';
import { apiClient } from '../lib/apiClient';

export default function Recruit() {
  const [data, setData] = useState<RecruitApiResponse | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  type ApplicantDetails = Applicant & {
    bio?: string | null;
    resumeUrl?: string | null;
  };

  useEffect(() => {
    apiClient('/api/recruit')
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((d: RecruitApiResponse) => setData(d))
      .catch((err) => console.error('Failed to load applicants:', err));
  }, []);

  const recommended: Applicant[] = data?.recommendedApplicants ?? [];
  const all: Applicant[] = data?.allApplicants ?? [];
  const selected = useMemo(() => {
    if (!selectedApplicant) return null;
    return selectedApplicant as ApplicantDetails;
  }, [selectedApplicant]);

  useEffect(() => {
    if (!selectedApplicant) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedApplicant(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedApplicant]);

  return (
    <div className="jh-recruit-container">
      <div className="jh-section-header">
        <h2>Recruit Talent</h2>
        <p>Find candidates whose personality and skills align with your openings.</p>
      </div>

      {recommended.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h3 className="jh-top-candidates-heading">Top Candidates</h3>
          <div className="jh-applicant-grid">
            {recommended.map((applicant) => (
              <button
                key={applicant.id}
                type="button"
                onClick={() => setSelectedApplicant(applicant)}
                style={{
                  all: 'unset',
                  display: 'block',
                  cursor: 'pointer',
                  borderRadius: 16,
                }}
                aria-label={`View details for ${applicant.name}`}
              >
                <ApplicantCard applicant={applicant} />
              </button>
            ))}
          </div>
        </div>
      )}

      {all.length > 0 && (
        <div>
          <h3 style={{ marginBottom: '1.25rem' }}>All Applicants</h3>
          <div className="jh-applicant-grid">
            {all.map((applicant) => (
              <button
                key={applicant.id}
                type="button"
                onClick={() => setSelectedApplicant(applicant)}
                style={{
                  all: 'unset',
                  display: 'block',
                  cursor: 'pointer',
                  borderRadius: 16,
                }}
                aria-label={`View details for ${applicant.name}`}
              >
                <ApplicantCard applicant={applicant} />
              </button>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Candidate details for ${selected.name}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedApplicant(null);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 3vw, 32px)',
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: 'min(860px, 100%)',
              maxHeight: 'min(84vh, 860px)',
              overflow: 'auto',
              background: 'white',
              borderRadius: 18,
              boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
              padding: 'clamp(16px, 2.5vw, 28px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: selected.avatarColor || '#e5e7eb',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#111827',
                    fontWeight: 800,
                    letterSpacing: 0.5,
                  }}
                >
                  {selected.initials || selected.name?.slice(0, 2)?.toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0 }}>{selected.name}</h3>
                    {(selected.isRecommended || recommended.some((a) => a.id === selected.id)) && (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: 999,
                          background: '#ecfeff',
                          color: '#0e7490',
                          border: '1px solid #a5f3fc',
                        }}
                      >
                        Recommended
                      </span>
                    )}
                  </div>
                  {selected.title && (
                    <p style={{ margin: '6px 0 0', color: '#4b5563', fontWeight: 600 }}>
                      {selected.title}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                aria-label="Close candidate details"
                style={{
                  border: '1px solid #e5e7eb',
                  background: 'white',
                  borderRadius: 12,
                  padding: '8px 10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Close
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 16,
              }}
            >
              <div
                style={{
                  gridColumn: 'span 12',
                  border: '1px solid #e5e7eb',
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <h4 style={{ margin: 0, marginBottom: 10 }}>Fit summary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 700 }}>Resume fit</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>
                      {selected.resumeFitPercent ?? 0}
                      <span style={{ fontSize: 14, fontWeight: 800 }}>%</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 700 }}>Personality fit</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>
                      {selected.personalityFitPercent ?? 0}
                      <span style={{ fontSize: 14, fontWeight: 800 }}>%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  gridColumn: 'span 12',
                  border: '1px solid #e5e7eb',
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <h4 style={{ margin: 0, marginBottom: 10 }}>Skills</h4>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {(selected.skills ?? []).length > 0 ? (
                    selected.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: '6px 10px',
                          borderRadius: 999,
                          background: '#f3f4f6',
                          border: '1px solid #e5e7eb',
                        }}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>No skills listed.</span>
                  )}
                </div>
              </div>

              {(selected.bio || selected.resumeUrl) && (
                <div
                  style={{
                    gridColumn: 'span 12',
                    border: '1px solid #e5e7eb',
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <h4 style={{ margin: 0, marginBottom: 10 }}>About</h4>
                  {selected.bio && <p style={{ margin: 0, color: '#374151', lineHeight: 1.6 }}>{selected.bio}</p>}
                  {selected.resumeUrl && (
                    <div style={{ marginTop: selected.bio ? 12 : 0 }}>
                      <a
                        href={selected.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontWeight: 800 }}
                      >
                        View resume
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ marginTop: 14, color: '#6b7280', fontSize: 12, fontWeight: 600 }}>
              Tip: press <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>Esc</span> to
              close.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
