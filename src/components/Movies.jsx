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
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const axios = require('axios');

  useEffect(() => {
    axios
    .get(`/api/movies?page=${page}`)
    .then(resopnse => setMovies(resopnse.data));
  }, []);

  return (
    <Center>
      <SimpleGrid columns={5} spacing={6} mt={2}>
        {movies.map(movie => (
          <Box key={movie?.id} maxW="sm" minW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={movie?.imageUrl} w="full" h={'80'} />
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
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
              {movie?.description}
            </Box>
            <Box>
              <Badge>{movie?.genre}</Badge>
            </Box>
            <Link href={movie?.link} isExternal>
              <Button>Watch</Button>
            </Link>
          </Box>
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
                <SkeletonCircle w={32}/>
              </Box>
            ))}
      </SimpleGrid>
    </Center>
  );
}

export default Movies;
