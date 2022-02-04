import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import DeleteMovie from '../DeleteMovie';

function MovieCard({ movie, adminMode, onEdit, onDelete }) {
  return (
    <Box w={['xs', 'xs', 'xs', 'md']} borderWidth="1px" borderRadius="lg" p={2}>
      <Flex flexDir="column" justifyContent="space-between" h="full">
        <Box>
          <Image src={movie?.imageUrl} w="full" h="md" />
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {movie?.title}
          </Box>
          <Box as="span" color="gray.600">
            {movie?.director}
          </Box>
          <Box mt={2} fontWeight="semibold" as="h4" lineHeight="tight">
            {movie?.description}
          </Box>
        </Box>
        <Box>
          <Box mt={4}>
            <Badge>{movie?.genre}</Badge>
          </Box>
          <HStack mt={2} alignItems="center">
            <Link href={movie?.link} isExternal>
              <Button>Watch</Button>
            </Link>
            {adminMode && (
              <>
                <Button onClick={() => onEdit(movie)} colorScheme="green">
                  Edit
                </Button>
                <DeleteMovie onDelete={() => onDelete(movie?.id)} />
              </>
            )}
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default MovieCard;
