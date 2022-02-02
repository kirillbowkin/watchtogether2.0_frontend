import { HStack, Link, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { UserContext } from '../../context/UserContext';
import Login from './Login';
import MovieSearch from '../movie/MovieSearch';
import Profile from './Profile';

function Header() {
  const context = useContext(UserContext);
  const { user } = context;

  return (
    <HStack
      py={2}
      px={4}
      bg={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
    >
      <Link as={ReactLink} to="/">
        <Text>WatchTogether 2.0</Text>
      </Link>
      {/* <MovieSearch /> */}
      <HStack>
        {user ? <Profile /> : <Login />}
        <ColorModeSwitcher />
      </HStack>
    </HStack>
  );
}

export default Header;
