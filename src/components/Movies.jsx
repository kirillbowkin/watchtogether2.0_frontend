import {
  SimpleGrid,
  Box,
  Image,
  Badge,
  StarIcon,
  Button,
  Link,
  Center,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import { MoviesContext } from '../context/MoviesContext';
import MovieCard from './MovieCard';

function Movies({ adminMode }) {
  const context = useContext(MoviesContext)
  const {movies, getMovies} = context

  useEffect(() => {
    getMovies()
  }, []);

  return (
    <Center>
      <SimpleGrid columns={5} spacing={6} mt={2}>
        {movies.map(movie => (
          <MovieCard key={movie?.id} movie={movie} adminMode={adminMode} getMovies={getMovies} />
        ))}
        {movies.length === 0 &&
          Array(10)
            .fill(1)
            .map((_, index) => (
              <Box
                key={index}
                maxW="sm"
                minW="md"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Skeleton w="full" h={'80'}>
                  nbsp;
                </Skeleton>
                <SkeletonText noOfLines={10} />
                {/* <Link isExternal>
                  <Button>Watch</Button>
                </Link> */}
                <SkeletonCircle w={32} />
              </Box>
            ))}
      </SimpleGrid>
    </Center>
  );
}

export default Movies;
