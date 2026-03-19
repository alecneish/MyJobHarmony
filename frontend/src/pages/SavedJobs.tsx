import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Job, JobsApiResponse } from '../types';
import JobCard from '../components/JobCard';

const STORAGE_KEY = 'jh-saved-jobs';

function getSavedIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[];
  } catch {
    return [];
  }
}

export default function SavedJobs() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>(getSavedIds());

  useEffect(() => {
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((d: JobsApiResponse) => setAllJobs(d.jobs));
  }, []);

  const handleSaveToggle = useCallback(() => {
    setSavedIds(getSavedIds());
  }, []);

  const savedJobs = allJobs.filter((job) => savedIds.includes(String(job.id)));

  return (
    <div className="jh-jobs-container" id="jh-saved-page">
      <div className="jh-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Saved Jobs</h2>
        <p>Jobs you've bookmarked for later.</p>
      </div>

      <div id="jh-saved-job-list">
        {savedJobs.map((job) => (
          <JobCard key={job.id} job={job} onSaveToggle={handleSaveToggle} />
        ))}
      </div>

      {savedJobs.length === 0 && (
        <div className="jh-empty-state" id="jh-saved-empty">
          <span className="jh-empty-icon">🔖</span>
          <h3>No Saved Jobs Yet</h3>
          <p>Browse job listings and save the ones that interest you.</p>
          <Link to="/jobs" className="jh-btn-primary">Browse Jobs</Link>
        </div>
      )}
    </div>
  );
}
