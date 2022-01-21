import { ChakraProvider, ColorModeScript, useColorMode } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from '@chakra-ui/react';
import UserContextProvider from './context/UserContext';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
