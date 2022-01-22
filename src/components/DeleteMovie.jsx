import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function DeleteMovie({ id, getMovies }) {
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axios = require('axios');
  const toast = useToast();
  const context = useContext(UserContext);
  const { tokens } = context;

  const onDelete = () => {
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
      getMovies();
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
    <>
      <Button onClick={onOpen} colorScheme="red">
        Delete
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Movie?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You are about to delete this movie, are you sure?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteMovie;
