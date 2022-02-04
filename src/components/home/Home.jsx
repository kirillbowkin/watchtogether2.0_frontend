import { usePagination } from '@ajna/pagination';
import { Box, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Movies from '../movie/Movies';
import MovieSearch from '../movie/MovieSearch';
import MyPagination from './MyPagination';

function Home() {
  const toast = useToast();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: totalPages,
    limits: {
      inner: 2,
      outer: 2,
    },
    initialState: { currentPage: 1 },
  });

  useEffect(() => {
    if (state.showNotAllowed) {
      toast({
        title: 'You are not allowed to do this 😎',
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    searchTitle === '' ? fetchMovies() : searchMovies();
  }, [currentPage, searchTitle]);

  const fetchMovies = async () => {
    setIsLoading(true);

    axios
      .get(`/api/movies?page=${currentPage - 1}`)
      .then(response => {
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
      })
      .catch(error =>
        toast({
          title: 'Error',
          description: 'Failed to load movies',
          position: 'top',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      )
      .finally(setIsLoading(false));
  };

  //TODO: this is probaby bad
  const onSearch = title => {
    setSearchTitle(title);
    setCurrentPage(1);
  };

  const searchMovies = async () => {
    axios
      .get(`/api/movies/search?title=${searchTitle}&page=${currentPage - 1}`)
      .then(response => {
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
      })
      .catch(() => {
        setMovies([]);
        setTotalPages(0);
      });
  };

  return (
    <VStack alignItems="center" mt={2} spacing={4}>
      <MovieSearch onSearch={onSearch} />
      <Movies isLoading={isLoading} movies={movies} />
      <Box mt={16}>
        <MyPagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          setCurrentPage={setCurrentPage}
          pages={pages}
        />
      </Box>
    </VStack>
  );
}

export default Home;
