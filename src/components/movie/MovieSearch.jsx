import {
  CloseButton,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { React, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

function MovieSearch({ onSearch }) {
  const [title, setTitle] = useState('');
  const inputRef = useRef();

  return (
    <HStack>
      <InputGroup w={['xs', 'lg']}>
        <Input
          placeholder="Search for movie"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch(title)}
          ref={inputRef}
        />
        {title !== '' && (
          <InputRightElement
            children={
              <CloseButton
                onClick={() => {
                  setTitle('');
                  inputRef.current.focus();
                }}
              />
            }
          />
        )}
      </InputGroup>
      <IconButton icon={<BiSearch />} onClick={() => onSearch(title)} />
    </HStack>
  );
}

export default MovieSearch;
