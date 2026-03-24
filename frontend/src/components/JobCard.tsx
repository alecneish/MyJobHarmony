import { Job } from '../types';
import { showSnackbar } from './Snackbar';

const STORAGE_KEY = 'jh-saved-jobs';

function getSavedIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[];
  } catch {
    return [];
  }
}

interface JobCardProps {
  job: Job;
  onSaveToggle?: () => void;
}

export default function JobCard({ job, onSaveToggle }: JobCardProps) {
  const savedIds = getSavedIds();
  const isSaved = savedIds.includes(String(job.id));

  function toggleSave() {
    const ids = getSavedIds();
    const idx = ids.indexOf(String(job.id));

    if (idx !== -1) {
      ids.splice(idx, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      showSnackbar('Job removed from saved', () => {
        const restored = getSavedIds();
        restored.push(String(job.id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
        onSaveToggle?.();
      });
    } else {
      ids.push(String(job.id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      showSnackbar('Job saved!', () => {
        const restored = getSavedIds();
        const i = restored.indexOf(String(job.id));
        if (i !== -1) restored.splice(i, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
        onSaveToggle?.();
      });
    }

    onSaveToggle?.();
  }

  const postedText = job.postedDaysAgo === 1 ? '1 day ago' : `${job.postedDaysAgo} days ago`;

  return (
    <div
      className="jh-job-card"
      data-job-id={job.id}
      data-type={job.type}
      data-location={job.location}
      data-tags={job.tags.join(',')}
      data-title={job.title}
      data-company={job.company}
    >
      <div className="jh-job-card-image">
        <img src={job.image} alt={job.title} />
        <div className={`jh-fit-badge ${job.fitLevel.toLowerCase()}`}>{job.fitScore}%</div>
      </div>

      <div className="jh-job-card-body">
        <div className="jh-job-card-top">
          <div>
            <h3 className="jh-job-title">{job.title}</h3>
            <div className="jh-job-company">{job.company}</div>
          </div>
          <div className="jh-job-salary">{job.salary}</div>
        </div>

        <div className="jh-job-fit-reason">{job.fitReason}</div>

        <div className="jh-job-card-bottom">
          <div className="jh-job-meta">
            <span className="jh-job-meta-pill">{job.location}</span>
            <span className="jh-job-meta-pill">{job.type}</span>
            <span className="jh-job-meta-pill">{postedText}</span>
          </div>

          <div className="jh-job-actions">
            <a href="#" className="jh-btn-primary jh-btn-sm" onClick={(e) => e.preventDefault()}>
              Apply Now
            </a>
            <button
              className={`jh-save-btn${isSaved ? ' saved' : ''}`}
              onClick={toggleSave}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
