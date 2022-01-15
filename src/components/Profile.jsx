import React, { useContext } from 'react';
import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Button,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { FiLogOut } from 'react-icons/fi';

function Profile() {
  const context = useContext(UserContext);
  const { user, setUser } = context;

  const logout = () => {
    console.log('in logout');
    setUser(null);
    localStorage.removeItem('user');
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
      <MenuList alignItems={'center'}>
        <Center>
          <Avatar size={'xl'} src={user?.avatarUrl} />
        </Center>
        <Center>{user?.profileName}</Center>
        <Center>
          {user?.roles.map(role => (
            <Badge colorScheme="green" mr={2}>
              {role?.name}
            </Badge>
          ))}
        </Center>
        <MenuDivider />
        <MenuItem>
          <Button onClick={logout} flex="1 0 0" justifyContent="flex-start">
            <Icon as={FiLogOut} size="xs" mr={2} />
            Logout
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Profile;
