import { Text, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../room/RoomCard';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const defaultToast = {
    position: 'top',
    duration: 3000,
    isClosable: true,
  };

  const toast = useToast();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    axios
      .get('/api/watchRooms')
      .then(resp => setRooms(resp.data))
      .catch(() =>
        toast({ ...defaultToast, title: 'Error occured', status: 'error' })
      );
  };

  return (
    <VStack mt={4} alignItems="center" justifyContent="center">
      {rooms.map(room => (
        <RoomCard
          key={room?.id}
          room={room}
          onJoin={() => navigate(`/rooms/${room?.id}`)}
        />
      ))}
      {rooms.length === 0 && <Text fontSize="lg">No rooms yet</Text>}
    </VStack>
  );
}

export default Rooms;
