import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Job, JobsApiResponse } from '../types';
import JobCard from '../components/JobCard';
import FilterPanel from '../components/FilterPanel';
import { useAuth } from '../context/AuthContext';

export default function Jobs() {
  const { userProfile } = useAuth();
  const [data, setData] = useState<JobsApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  if (userProfile?.role === 'recruiter') {
    return <Navigate to="/recruiter/dashboard" replace />;
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const r = await fetch('/api/jobs');
        if (!r.ok) {
          throw new Error(`Failed to load jobs (${r.status})`);
        }
        const d = (await r.json()) as JobsApiResponse;
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) {
          setData({ jobs: [], allTags: [], allTypes: [], allLocations: [] });
          setError(e instanceof Error ? e.message : 'Failed to load jobs');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Re-render job cards when save state changes
  const handleSaveToggle = useCallback(() => {
    setRenderKey((k) => k + 1);
  }, []);

  const filteredJobs: Job[] = (data?.jobs ?? []).filter((job) => {
    const s = search.toLowerCase();
    const matchSearch =
      !s ||
      job.title.toLowerCase().includes(s) ||
      job.company.toLowerCase().includes(s) ||
      job.tags.some((t) => t.toLowerCase().includes(s));

    const matchType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    const matchLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location);
    const matchTags =
      selectedTags.length === 0 || selectedTags.some((tag) => job.tags.includes(tag));

    return matchSearch && matchType && matchLocation && matchTags;
  });

  function clearFilters() {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedTags([]);
    setSearch('');
  }

  return (
    <div className="jh-jobs-container">
      <div className="jh-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Job Listings</h2>
        <p>Jobs ranked by how well they match your personality profile.</p>
      </div>

      {error && (
        <div className="jh-empty-state" style={{ marginBottom: '1.5rem' }}>
          <h3>Couldn’t load jobs</h3>
          <p>{error}</p>
        </div>
      )}

      <div className="jh-search-bar">
        <input
          type="text"
          className="jh-search-input"
          id="jh-search"
          placeholder="Search jobs by title, company, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="jh-btn-secondary" onClick={() => setFilterOpen(true)}>
          Filters
        </button>
      </div>

      <div id="jh-job-list" key={renderKey}>
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} onSaveToggle={handleSaveToggle} />
        ))}
      </div>

      {filteredJobs.length === 0 && data !== null && (
        <div className="jh-no-results show">
          <h3>No jobs match your filters</h3>
          <p>Try adjusting your search or clearing filters.</p>
        </div>
      )}

      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={() => setFilterOpen(false)}
        onClear={clearFilters}
        allTypes={data?.allTypes ?? []}
        allLocations={data?.allLocations ?? []}
        allTags={data?.allTags ?? []}
        selectedTypes={selectedTypes}
        selectedLocations={selectedLocations}
        selectedTags={selectedTags}
        onTypeChange={(type, checked) =>
          setSelectedTypes((prev) =>
            checked ? [...prev, type] : prev.filter((t) => t !== type),
          )
        }
        onLocationChange={(loc, checked) =>
          setSelectedLocations((prev) =>
            checked ? [...prev, loc] : prev.filter((l) => l !== loc),
          )
        }
        onTagChange={(tag, checked) =>
          setSelectedTags((prev) =>
            checked ? [...prev, tag] : prev.filter((t) => t !== tag),
          )
        }
      />
    </div>
  );
}
