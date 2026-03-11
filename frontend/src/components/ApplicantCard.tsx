import { Applicant } from '../types';

interface ApplicantCardProps {
  applicant: Applicant;
}

export default function ApplicantCard({ applicant }: ApplicantCardProps) {
  return (
    <div className="jh-applicant-card">
      <div className="jh-applicant-header">
        <div className="jh-avatar" style={{ backgroundColor: applicant.avatarColor }}>
          {applicant.initials}
        </div>
        <div>
          <div className="jh-applicant-name">
            {applicant.name}
            {applicant.isRecommended && (
              <span className="jh-recommended-badge" style={{ marginLeft: '0.5rem' }}>
                Recommended
              </span>
            )}
          </div>
          <div className="jh-applicant-title">{applicant.title}</div>
        </div>
      </div>

      <div className="jh-applicant-skills">
        {applicant.skills.map((skill) => (
          <span key={skill} className="jh-skill-tag">{skill}</span>
        ))}
      </div>

      <div className="jh-fit-badges">
        <div className="jh-circular-badge">
          <div className="jh-circular-badge-ring resume">{applicant.resumeFitPercent}%</div>
          <span className="jh-circular-badge-label">Resume</span>
        </div>
        <div className="jh-circular-badge">
          <div className="jh-circular-badge-ring personality">{applicant.personalityFitPercent}%</div>
          <span className="jh-circular-badge-label">Personality</span>
        </div>
      </div>
    </div>
  );
}
