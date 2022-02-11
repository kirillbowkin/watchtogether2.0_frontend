import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import AdminPanel from './adminPanel/AdminPanel';
import Chat from './chat/Chat';
import Player from './player/Player';
import UsersList from './usersList/UsersList';

function WatchTogether() {
  const users = [
    {
      avatarUrl:
        'https://lh3.googleusercontent.com/ogw/ADea4I55tZnvR-6Yt3dWFKR-khlxqrdvhSHzTADXZnvk3Q=s83-c-mo',
      profileName: 'Biba Andersson',
    },
    {
      avatarUrl:
        'https://lh3.googleusercontent.com/ogw/ADea4I6xs56Rng14J0WnVyRmxoyRAuHBsz15YfT8-28=s32-c-mo',
      profileName: 'Kirill Shishkin',
    },
  ];

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
