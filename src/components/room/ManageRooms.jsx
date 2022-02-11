import { AddIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Tooltip, VStack } from '@chakra-ui/react';
import React from 'react';

function ManageRooms() {
  return (
    <VStack mt={4} alignItems="center" justifyContent="center">
      <Tooltip label="Add new room" placement="right-start">
        <IconButton size="lg" isRound={true} icon={<AddIcon />} />
      </Tooltip>
    </VStack>
  );
}

export default ManageRooms;
