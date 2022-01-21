import React, { useContext } from 'react';
import { useColorModeValue, HStack, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Profile from './Profile';
import Login from './Login'
import { UserContext } from '../context/UserContext';
import {Link as ReachLink} from 'react-router-dom'
import {Link} from '@chakra-ui/react'

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
      <Link as={ReachLink} to="/">
        <Text>WatchTogether 2.0</Text>
      </Link>
      <HStack>
        {user ? <Profile /> : <Login />}
        <ColorModeSwitcher />
      </HStack>
    </HStack>
  );
}

export default Header;
