import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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
