import { usePagination } from '@ajna/pagination';
import {
  Box,
  IconButton,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { UserContext } from '../../context/UserContext';
import MyPagination from '../home/MyPagination';
import Movies from './Movies';
import MovieSearch from './MovieSearch';
import SaveMovieModal from './SaveMovieModal';

//TODO: refactor duplicating code
function ManageMovies() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movieModal, setMovieModal] = useState({
    title: 'Add movie',
    content: {},
    mode: 'save',
  });

  const context = useContext(UserContext);
  const { tokens } = context;

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
    searchTitle ? searchMovies() : fetchMovies();
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

  const saveMovie = async movie => {
    const mode = movieModal.mode;

    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokens.access_token,
    };

    if (mode === 'save') {
      axios
        .post('/api/movies', {
          ...movie,
        })
        .then(() => {
          onClose();
          toast({
            title: 'Movie added',
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          fetchMovies();
        })
        .catch(e =>
          toast({
            title: 'Error occured: ',
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        );
    }

    if (mode === 'update') {
      axios
        .put(`/api/movies/${movie?.id}`, {
          ...movie,
        })
        .then(() => {
          onClose();
          toast({
            title: 'Movie edited',
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          fetchMovies();
        })
        .catch(e =>
          toast({
            title: 'Error occured: ',
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        );
    }
  };

  const deleteMovie = async id => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokens.access_token,
    };

    axios
      .delete(`/api/movies/${id}`)
      .then(() => {
        onClose();
        toast({
          title: 'Movie deleted',
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        fetchMovies();
      })
      .catch(e =>
        toast({
          title: 'Error occured: ',
          position: 'top',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      );
  };

  return (
    <Box>
      <Box position="fixed" bottom="0" right="0" m={6}>
        <IconButton
          icon={<AiOutlinePlusCircle />}
          onClick={() => {
            setMovieModal({
              ...movieModal,
              title: 'Add Movie',
              content: {},
              mode: 'save',
            });
            onOpen();
          }}
        />
      </Box>
      <SaveMovieModal
        isOpen={isOpen}
        onClose={onClose}
        title={movieModal.title}
        content={movieModal.content}
        onSubmit={saveMovie}
      />
      <VStack alignItems="center" mt={2} spacing={4}>
        <MovieSearch onSearch={onSearch} />
        <Movies
          isLoading={isLoading}
          movies={movies}
          adminMode={true}
          onEdit={movie => {
            setMovieModal({
              ...movieModal,
              title: 'Edit Movie',
              content: movie,
              mode: 'update',
            });
            onOpen();
          }}
          onDelete={deleteMovie}
        />
        <Box mt={16}>
          <MyPagination
            currentPage={currentPage}
            pages={pages}
            pagesCount={pagesCount}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      </VStack>
    </Box>
  );
}

export default ManageMovies;
