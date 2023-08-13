import React from "react";
import MultiSelectDropdown from "./MultiSelect/MultiselectDropdown";

const Filters = ({
  languages,
  genres,
  selectedLanguages,
  setSelectedLanguages,
  selectedGenres,
  setSelectedGenres,
  searchTerm,
  setSearchTerm,
  sortCriteria,
  setSortCriteria,
  onClearAll,
}) => {
  return (
    <div className="filters">
      <div className="filter">
        <label>Sort By:</label>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="votes">Votes</option>
        </select>
      </div>

      <div className="filter">
        <label>Language:</label>
        <MultiSelectDropdown
          options={languages}
          selected={selectedLanguages}
          setSelected={setSelectedLanguages}
          label="Language"
        />
      </div>

      <div className="filter">
        <label>Genre:</label>

        <MultiSelectDropdown
          options={genres}
          selected={selectedGenres}
          setSelected={setSelectedGenres}
          label="Genre"
        />
      </div>

      <div className="filter">
        <label>Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
        />
      </div>

      <div className="filter">
        <button onClick={onClearAll}>Clear All Filters</button>
      </div>
    </div>
  );
}

export default Filters;
