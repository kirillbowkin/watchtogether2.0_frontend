import { Badge, Box, Button, HStack, Image, Link } from '@chakra-ui/react';
import React from 'react';
import DeleteMovie from '../DeleteMovie';

function MovieCard({ movie, adminMode, onEdit, onDelete }) {
  return (
    <Box
      w={['xs', 'xs', 'xs', 'md']}
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
      <Link href={movie?.link} isExternal>
        <Button>Watch</Button>
      </Link>
      {adminMode && (
        <HStack>
          <Button onClick={() => onEdit(movie)} colorScheme="green">
            Edit
          </Button>
          <DeleteMovie onDelete={() => onDelete(movie?.id)} />
        </HStack>
      )}
    </Box>
  );
}

export default MovieCard;
