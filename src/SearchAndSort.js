import React from 'react';

const SearchAndSort = ({ onSearch, onSort }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <select onChange={(e) => onSort(e.target.value)} style={{ padding: '5px' }}>
        <option value="id">Sort by ID</option>
        <option value="userId">Sort by User ID</option>
      </select>
    </div>
  );
};

export default SearchAndSort;