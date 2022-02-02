import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';
import MovieCard from './MovieCard';

function Movies({ movies, adminMode, isLoading, onEdit, onDelete }) {
  return (
    <SimpleGrid columns={[1, 2, null, null, 3, 5]} spacing={6} mt={2}>
      {isLoading &&
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
              <SkeletonCircle w={32} />
            </Box>
          ))}
      {!isLoading &&
        movies.length !== 0 &&
        movies.map(movie => (
          <MovieCard
            key={movie?.id}
            movie={movie}
            adminMode={adminMode}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </SimpleGrid>
  );
}

export default Movies;
