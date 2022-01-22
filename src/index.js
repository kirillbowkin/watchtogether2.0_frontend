import {
  ChakraProvider,
  ColorModeScript,
  useColorMode,
} from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from '@chakra-ui/react';
import UserContextProvider from './context/UserContext';
import MoviesContextProvider from './context/MoviesContext';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <MoviesContextProvider>
          <App />
        </MoviesContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
