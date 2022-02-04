import {
  Avatar,
  Badge,
  Button,
  Center,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { BiMovie } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { Link as ReachLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Profile() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const toast = useToast();

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "You've been successfully logged out",
      position: 'top',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Avatar size={'sm'} src={user?.avatarUrl} />
      </MenuButton>
      <MenuList>
        <Center>
          <Avatar size={'xl'} src={user?.avatarUrl} />
        </Center>
        <Center>{user?.profileName}</Center>
        <Center>
          {user?.roles.map(role => (
            <Badge key={role?.id} colorScheme={role?.color} mr={2}>
              {role?.name}
            </Badge>
          ))}
        </Center>
        <MenuDivider />
        <MenuItem as={ReachLink} to="/admin/movies">
          <Icon as={BiMovie} size="xs" mr={2} />
          <Text>Manage movies</Text>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Icon as={FiLogOut} />
          <Text ml={2}>Logout</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Profile;