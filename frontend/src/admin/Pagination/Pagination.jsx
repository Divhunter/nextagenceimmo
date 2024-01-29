import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css'

const Pagination = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
      pageClassName='page'
      nextClassName={`next `}
      previousClassName='prev'
    />
  );
};

export default Pagination;