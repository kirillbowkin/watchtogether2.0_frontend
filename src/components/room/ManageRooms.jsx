import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/UserContext';
import RoomCard from './RoomCard';

function ManageRooms() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [rooms, setRooms] = useState([]);

  const context = useContext(UserContext);
  const { tokens } = context;

  const defaultToast = {
    position: 'top',
    duration: 3000,
    isClosable: true,
  };

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    reset();
  }, [isOpen]);

  const createRoom = async room => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokens.access_token,
    };

    axios
      .post('/api/watchRooms', {
        ...room,
        roomId: '',
      })
      .then(() => {
        toast({
          ...defaultToast,
          title: 'Room was successfully created',
          status: 'success',
        });
      })
      .catch(() => {
        toast({ ...defaultToast, title: 'Error occured', status: 'error' });
      })
      .finally(() => {
        onClose();
        fetchRooms();
      });
  };

  const fetchRooms = async () => {
    axios
      .get('/api/watchRooms')
      .then(resp => setRooms(resp.data))
      .catch(() =>
        toast({ ...defaultToast, title: 'Error occured', status: 'error' })
      );
  };

  const onDelete = async roomId => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokens.access_token,
    };

    axios
      .delete(`/api/watchRooms/${roomId}`)
      .then(() =>
        toast({
          ...defaultToast,
          title: 'Room was successfully deleted',
          status: 'success',
        })
      )
      .catch(() =>
        toast({ ...defaultToast, title: 'Error occured', status: 'error' })
      )
      .finally(() => {
        onClose();
        fetchRooms();
      });
  };

  return (
    <VStack mt={4} alignItems="center" justifyContent="center">
      {rooms.map(room => (
        <RoomCard
          adminMode={true}
          key={room?.id}
          room={room}
          onDelete={onDelete}
        />
      ))}

      {/* Add Button */}
      <Tooltip label="Add new room" placement="right-start">
        <IconButton
          size="lg"
          isRound={true}
          icon={<AddIcon />}
          onClick={onOpen}
        />
        {/* Add Button */}
      </Tooltip>
      {/* Room Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create room</ModalHeader>
          <form onSubmit={handleSubmit(createRoom)}>
            <ModalBody>
              {/* Room Name */}
              <FormControl isInvalid={errors.roomName}>
                <Input
                  placeholder="Room Name"
                  {...register('roomName', {
                    required: 'Room Name is required',
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
                  {errors.roomName && errors.roomName.message}
                </FormErrorMessage>
              </FormControl>
              {/* Room Name */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" mr={3} type="submit">
                Create
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {/* Room Modal */}
    </VStack>
  );
}

export default ManageRooms;
