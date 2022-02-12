import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

function RoomCard({ room, onJoin, onDelete, adminMode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <VStack
      p={4}
      w="lg"
      borderWidth={1}
      borderRadius="lg"
      margin={2}
      alignItems="center"
      justifyContent="center"
    >
      <Text
        align="center"
        fontWeight="bold"
        fontSize="lg"
        letterSpacing="wide"
        color="teal.600"
      >
        {room?.roomName}
      </Text>
      <Text align="center" fontWeight="bold" fontSize="md">
        movie: {room?.movie?.title}
      </Text>
      <Text align="center" fontWeight="bold" fontSize="md">
        host: {room?.host?.profileName}
      </Text>
      <HStack>
        <Button colorScheme="green" onClick={onJoin}>
          Join
        </Button>
        {adminMode && (
          <Button colorScheme="red" onClick={onOpen}>
            Delete
          </Button>
        )}
      </HStack>
      {/* Delete Dialog */}
      {adminMode && (
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Delete Room?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              The room {room?.roomName.toUpperCase()} will be deleted
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => onDelete(room?.id)}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {/* Delete Dialog */}
    </VStack>
  );
}

export default RoomCard;
