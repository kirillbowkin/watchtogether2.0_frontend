import React, { useContext, useEffect, useState } from 'react';
import {
  VStack,
  Center,
  HStack,
  Box,
  SimpleGrid,
  GridItem,
  Button,
  Icon,
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Image,
  useToast,
} from '@chakra-ui/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function ManageMovies() {
  const axios = require('axios');
  const toast = useToast();
  const context = useContext(UserContext);
  const { tokens } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = values => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokens.access_token,
    };
    axios
      .post('/api/movies', {
        ...values,
      })
      .then(() => {
        onClose()
         toast({
          title: 'Movie added',
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        }) 
      }
      )
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState('');

  useEffect(() => {
    reset();
  }, [isOpen]);

  return (
    <Box position="fixed" bottom="0" right="0" m={6}>
      <IconButton icon={<AiOutlinePlusCircle />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Movie</ModalHeader>
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
                  value={image}
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
    </Box>
  );
}

export default ManageMovies;
