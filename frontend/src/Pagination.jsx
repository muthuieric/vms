import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, handlePageChange }) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName="pagination flex mt-4 justify-end items-center"
      previousLinkClassName="px-3 py-2 border rounded-md mr-2 no-underline font-semibold"
      nextLinkClassName="px-3 py-2 border rounded-md ml-2 no-underline font-semibold"
      disabledClassName="pagination__link--disabled"
      activeClassName="pagination__link--active bg-blue-500 text-white"
      pageClassName="px-3 py-1 border rounded-md text-blue-500" 
      breakClassName="ml-2"
    />
  );
};

export default Pagination;
