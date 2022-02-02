import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
} from '@ajna/pagination';
import React from 'react';

function MyPagination({ currentPage, pagesCount, setCurrentPage, pages }) {
  return (
    <Pagination
      currentPage={currentPage}
      pagesCount={pagesCount}
      onPageChange={setCurrentPage}
    >
      <PaginationContainer>
        <PaginationPrevious mr={2}>Previous</PaginationPrevious>
        <PaginationPageGroup separator={<PaginationSeparator isDisabled />}>
          {pages.map(page => (
            <PaginationPage
              w={6}
              key={`pagination_page_${page}`}
              page={page}
              _current={{ bg: 'blue.300' }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext ml={2}>Next</PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
}

export default MyPagination;
