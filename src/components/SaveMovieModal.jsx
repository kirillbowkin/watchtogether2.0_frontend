import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import React, { useContext, useEffect, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Image,
  useToast,
  SimpleGrid,
  GridItem,
  Button,
  Icon,
  VStack,
  Center,
  HStack,
} from '@chakra-ui/react';

function SaveMovieModal({isOpen, onOpen, onClose, title, content, method, getMovies}) {
  const [image, setImage] = useState(content?.imageUrl);

  const axios = require('axios');
  const toast = useToast();
  const context = useContext(UserContext);
  const { tokens } = context;

  useEffect(() => {
    reset();
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: content?.title,
      link: content?.link,
      imageUrl: content?.imageUrl
    }
  });

  const onSubmit = values => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokens.access_token,
    };

    if(method === "post") {
      axios
      .post('/api/movies', {
        ...values,
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
        getMovies()
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

    if(method === "put") {
      axios
      .put(`/api/movies/${content?.id}`, {
        ...values,
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
        getMovies()
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum length is 20',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={2} isInvalid={errors.link}>
              <FormLabel>Video Link</FormLabel>
              <Input
                placeholder="Video URL link"
                {...register('link', {
                  required: 'Link is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum length should be 6',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Maximum length is 200',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.link && errors.link.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={2} isInvalid={errors.imageUrl}>
              <FormLabel>Image</FormLabel>
              <Input
                placeholder="Cover image URL"
                {...register('imageUrl', {
                  minLength: {
                    value: 6,
                    message: 'Minimum length should be 6',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Maximum length is 200',
                  },
                })}
                onChange={event => setImage(event.target.value)}
              />
              <FormErrorMessage>
                {errors.imageUrl && errors.imageUrl.message}
              </FormErrorMessage>
            </FormControl>
            <Image mt={2} src={image} w="full" />
            <ModalFooter>
              <Button colorScheme="green" mr={3} type="submit">
                Save
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SaveMovieModal;
