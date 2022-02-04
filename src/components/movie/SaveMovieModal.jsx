import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function SaveMovieModal({ isOpen, onClose, title, content, onSubmit }) {
  // TODO: think of neccessity of this
  const [image, setImage] = useState(content?.imageUrl);

  useEffect(() => {
    reset(content);
    setImage(content?.imageUrl);
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: content?.title,
      link: content?.link,
      imageUrl: content?.imageUrl,
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <FormControl isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum length is 20',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            {/* Title */}

            {/* Video Link */}
            <FormControl mt={2} isInvalid={errors.link}>
              <FormLabel>Video Link</FormLabel>
              <Input
                placeholder="Video URL link"
                {...register('link', {
                  required: 'Link is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum length should be 6',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Maximum length is 200',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.link && errors.link.message}
              </FormErrorMessage>
            </FormControl>
            {/* Video link */}

            {/* Image */}
            <FormControl mt={2} isInvalid={errors.imageUrl}>
              <FormLabel>Image</FormLabel>
              <Input
                placeholder="Cover image URL"
                {...register('imageUrl', {
                  minLength: {
                    value: 6,
                    message: 'Minimum length should be 6',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Maximum length is 200',
                  },
                })}
                onChange={event => setImage(event.target.value)}
              />
              <FormErrorMessage>
                {errors.imageUrl && errors.imageUrl.message}
              </FormErrorMessage>
            </FormControl>
            <Image mt={2} src={image} w="full" />
            {/* Image */}

            {/* Director */}
            <FormControl mt={2} isInvalid={errors.director}>
              <FormLabel>Director</FormLabel>
              <Input
                placeholder="Director"
                {...register('director', {
                  required: 'Director is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum length should be 6',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Maximum length is 20',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.director && errors.director.message}
              </FormErrorMessage>
            </FormControl>
            {/* Director */}

            {/* Decritption */}
            <FormControl mt={2} isInvalid={errors.description}>
              <FormLabel>Decritption</FormLabel>
              <Input
                placeholder="Decritption"
                {...register('description', {
                  required: 'Decritption is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum length should be 6',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Maximum length is 80',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            {/* Decritption */}

            {/* Genre */}
            <FormControl mt={2} isInvalid={errors.genre}>
              <FormLabel>Genre</FormLabel>
              <Input
                placeholder="Genre"
                {...register('genre', {
                  required: 'Genre is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum length should be 6',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Maximum length is 20',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.genre && errors.genre.message}
              </FormErrorMessage>
            </FormControl>
            {/* Genre */}

            <ModalFooter>
              <Button colorScheme="green" mr={3} type="submit">
                Save
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SaveMovieModal;
