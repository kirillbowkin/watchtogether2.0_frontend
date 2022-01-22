import AddMovie from './SaveMovieModal';
import { Box, IconButton, useDisclosure } from '@chakra-ui/react';
import Movies from './Movies';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../context/MoviesContext';

function ManageMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(MoviesContext);
  const { getMovies } = context;

  return (
    <Box>
      <Box position="fixed" bottom="0" right="0" m={6}>
        <IconButton icon={<AiOutlinePlusCircle />} onClick={onOpen} />
      </Box>
      <AddMovie
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        method="post"
        title="Add Movie"
        getMovies={getMovies}
      />
      <Movies adminMode={true} />
    </Box>
  );
}

export default ManageMovies;
