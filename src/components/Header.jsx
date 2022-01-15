import React, { useContext } from 'react';
import { useColorModeValue, HStack, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Profile from './Profile';
import Login from './Login'
import { UserContext } from '../context/UserContext';

function Header() {
  const context = useContext(UserContext)
  const {user} = context

  return (
    <HStack
      py={2}
      px={4}
      bg={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
    >
      <Text>WatchTogether 2.0</Text>
      <HStack>
        {user ? <Profile /> : <Login />}
        <ColorModeSwitcher />
      </HStack>
    </HStack>
  );
}

export default Header;
