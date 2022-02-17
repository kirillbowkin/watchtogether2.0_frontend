import { Flex, HStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import AdminPanel from './adminPanel/AdminPanel';
import Chat from './chat/Chat';
import Player from './player/Player';
import UsersList from './usersList/UsersList';

function WatchTogether() {
  // const users = [
  //   {
  //     avatarUrl:
  //       'https://lh3.googleusercontent.com/ogw/ADea4I55tZnvR-6Yt3dWFKR-khlxqrdvhSHzTADXZnvk3Q=s83-c-mo',
  //     profileName: 'Biba Andersson',
  //   },
  //   {
  //     avatarUrl:
  //       'https://lh3.googleusercontent.com/ogw/ADea4I6xs56Rng14J0WnVyRmxoyRAuHBsz15YfT8-28=s32-c-mo',
  //     profileName: 'Kirill Shishkin',
  //   },
  // ];

  const [users, setUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  const context = useContext(UserContext);
  const { tokens } = context;

  const navigate = useNavigate();
  const params = useParams();
  const roomId = params?.id;

  const defaultToast = {
    position: 'top',
    duration: 3000,
    isClosable: true,
  };

  const toast = useToast();

  const join = async () => {
    console.log('in join');
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokens.access_token,
    };

    axios
      .post(`/api/watchRooms/join/${roomId}`)
      .then(() => {
        setIsJoined(true);
        fetchRoomInfo();
      })
      .catch(() => {
        navigate('/rooms');
        toast({
          ...defaultToast,
          title: 'Error occured',
          status: 'error',
          description: 'Failed to join room ',
        });
      });
  };

  const leave = async () => {
    console.log('in leave');
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokens.access_token,
    };

    axios
      .delete(`/api/watchRooms/leave/${roomId}`)
      .then()
      .catch(e => {
        navigate('/rooms');
        toast({
          ...defaultToast,
          title: `Error occured ${e}`,
          status: 'error',
        });
      });
  };

  const fetchRoomInfo = async () => {
    axios
      .get(`/api/watchRooms/${roomId}`)
      .then(resp => setUsers(resp.data?.users))
      .catch(() =>
        toast({ ...defaultToast, title: 'Error occured', status: 'error' })
      );
  };

  useEffect(() => {
    join();
  }, []);

  useEffect(() => {
    if (isJoined) {
      return () => leave();
    }
  }, [isJoined]);

  useEffect(() => {
    window.onbeforeunload = function () {
      leave();
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <Flex flexDir="column">
      <UsersList users={users} />
      <HStack>
        <Player />
        <Chat />
      </HStack>
      <AdminPanel />
    </Flex>
  );
}

export default WatchTogether;
