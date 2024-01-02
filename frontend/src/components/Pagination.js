import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, handlePageChange }) => {
  return (
    <ReactPaginate
      previousLabel="<<"
      nextLabel=">>"
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName="pagination flex mt-4 justify-center"
      previousLinkClassName="px-3 py-2 border rounded-md mr-2 "
      nextLinkClassName="px-3 py-2 border rounded-md ml-2 "
      disabledClassName="pagination__link--disabled"
      activeClassName="pagination__link--active bg-blue-500 text-white "
      pageLinkClassName="px-2 py-2 border rounded-md "
      breakClassName="ml-2"
    />
  );
};

export default Pagination;
