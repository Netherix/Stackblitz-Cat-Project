import React from 'react';

const Pagination = ({ currentPage, maxPages, onPageChange }) => {
  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
};

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
};

  return (
    <div>
      <button onClick={() => onPageChange(handlePreviousPage)} disabled={currentPage === 1}>
        &lt; Previous
      </button>
      {Array.from({ length: maxPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(handleNextPage)} disabled={currentPage === maxPages}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
