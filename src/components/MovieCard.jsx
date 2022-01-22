import {
  Badge,
  Box,
  Button,
  Image,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import DeleteMovie from './DeleteMovie';
import EditMovie from './SaveMovieModal';

function MovieCard({ movie, adminMode, getMovies }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      maxW="sm"
      minW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={movie?.imageUrl} w="full" h={'80'} />
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {movie?.title}
      </Box>
      <Box as="span" color="gray.600">
        {movie?.director}
      </Box>
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
        {movie?.description}
      </Box>
      <Box>
        <Badge>{movie?.genre}</Badge>
      </Box>
      {adminMode ? (
        <>
          <Button onClick={onOpen} colorScheme="green">
            Edit
          </Button>
          <EditMovie
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            method="put"
            title="Edit Movie"
            content={movie}
            getMovies={getMovies}
          />
        </>
      ) : (
        <Link href={movie?.link} isExternal>
          <Button>Watch</Button>
        </Link>
      )}
      {adminMode && (
        <DeleteMovie id={movie?.id} getMovies={getMovies}/>
      )}
    </Box>
  );
}

export default MovieCard;
