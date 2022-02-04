import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserContextProvider from './context/UserContext';
import axios from 'axios';
import 'video-react/dist/video-react.css'; // import css

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
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
