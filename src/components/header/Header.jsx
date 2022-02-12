import {
  HStack,
  IconButton,
  Link,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FaTheaterMasks } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Login from './Login';
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
        <Tooltip label="WatchTogether" placement="bottom-start">
          <IconButton
            icon={<FaTheaterMasks />}
            variant="ghost"
            fontSize="2xl"
            as={ReactLink}
            to="/rooms"
          />
        </Tooltip>
        {user ? <Profile /> : <Login />}
        {/* <ColorModeSwitcher /> */}
      </HStack>
    </HStack>
  );
}

export default Header;
