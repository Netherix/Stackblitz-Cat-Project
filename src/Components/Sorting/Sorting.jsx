import React from 'react';

const Sorting = ({ sortAttribute, onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value); // Call the handler passed from parent component
  };

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" onChange={handleSortChange} value={sortAttribute}>
        <option value="default">Default</option>
        <option value="intelligence">Intelligence</option>
        <option value="child_friendly">Child Friendly</option>
        <option value="dog_friendly">Dog Friendly</option>
        <option value="shedding_level">Shedding Level</option>
        <option value="affection_level">Affection Level</option>
        <option value="health_issues">Health Issues</option>
      </select>
    </div>
  );
};

export default Sorting;
