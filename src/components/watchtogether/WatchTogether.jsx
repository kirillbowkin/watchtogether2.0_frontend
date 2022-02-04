import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import AdminPanel from './adminPanel/AdminPanel';
import Chat from './chat/Chat';
import Player from './player/Player';
import UsersList from './usersList/UsersList';

function WatchTogether() {
  return (
    <Flex flexDir="column">
      <UsersList />
      <HStack>
        <Player />
        <Chat />
      </HStack>
      <AdminPanel />
    </Flex>
  );
}

export default WatchTogether;
