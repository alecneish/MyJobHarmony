interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
  allTypes: string[];
  allLocations: string[];
  allTags: string[];
  selectedTypes: string[];
  selectedLocations: string[];
  selectedTags: string[];
  onTypeChange: (type: string, checked: boolean) => void;
  onLocationChange: (location: string, checked: boolean) => void;
  onTagChange: (tag: string, checked: boolean) => void;
}

export default function FilterPanel({
  isOpen,
  onClose,
  onApply,
  onClear,
  allTypes,
  allLocations,
  allTags,
  selectedTypes,
  selectedLocations,
  selectedTags,
  onTypeChange,
  onLocationChange,
  onTagChange,
}: FilterPanelProps) {
  return (
    <>
      {isOpen && (
        <div className="jh-filter-overlay show" onClick={onClose} />
      )}
      <aside className={`jh-filter-sidebar${isOpen ? ' show' : ''}`} id="jh-filter-panel">
        <div className="jh-filter-sidebar-header">
          <h4>Filters</h4>
          <button className="jh-filter-sidebar-close" onClick={onClose}>&times;</button>
        </div>

        <div className="jh-filter-sidebar-body">
          <div className="jh-filter-row">
            <h5 className="jh-filter-row-title">Type</h5>
            <div className="jh-filter-row-options">
              {allTypes.map((type) => (
                <label key={type} className="jh-filter-label">
                  <input
                    type="checkbox"
                    className="jh-filter-checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={(e) => onTypeChange(type, e.target.checked)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="jh-filter-row">
            <h5 className="jh-filter-row-title">Location</h5>
            <div className="jh-filter-row-options">
              {allLocations.map((loc) => (
                <label key={loc} className="jh-filter-label">
                  <input
                    type="checkbox"
                    className="jh-filter-checkbox"
                    checked={selectedLocations.includes(loc)}
                    onChange={(e) => onLocationChange(loc, e.target.checked)}
                  />
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="jh-filter-row">
            <h5 className="jh-filter-row-title">Tags</h5>
            <div className="jh-filter-row-options">
              {allTags.map((tag) => (
                <label key={tag} className="jh-filter-label">
                  <input
                    type="checkbox"
                    className="jh-filter-checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={(e) => onTagChange(tag, e.target.checked)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="jh-filter-sidebar-footer">
          <button className="jh-btn-secondary" onClick={onClear}>Clear All</button>
          <button className="jh-btn-primary" onClick={onApply}>Apply</button>
        </div>
      </aside>
    </>
  );
}
