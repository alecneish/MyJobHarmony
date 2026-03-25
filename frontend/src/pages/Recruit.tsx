import { useState, useEffect } from 'react';
import { Applicant, RecruitApiResponse } from '../types';
import ApplicantCard from '../components/ApplicantCard';
import { apiClient } from '../lib/apiClient';

export default function Recruit() {
  const [data, setData] = useState<RecruitApiResponse | null>(null);

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
              <ApplicantCard key={applicant.id} applicant={applicant} />
            ))}
          </div>
        </div>
      )}

      {all.length > 0 && (
        <div>
          <h3 style={{ marginBottom: '1.25rem' }}>All Applicants</h3>
          <div className="jh-applicant-grid">
            {all.map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
