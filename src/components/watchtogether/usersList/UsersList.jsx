import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';

function UsersList({ users }) {
  return (
    <HStack p={2}>
      {users?.map(user => (
        <VStack>
          <Avatar src={user?.avatarUrl} />
          <Box maxW={12}>
            <Text isTruncated>{user?.profileName.split(' ')[0]}</Text>
          </Box>
        </VStack>
      ))}
    </HStack>
  );
}

export default UsersList;
