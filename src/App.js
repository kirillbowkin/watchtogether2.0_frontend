import { Box, useToast, useColorMode } from '@chakra-ui/react';
import { React, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import ManageMovies from './components/movie/ManageMovies';
import ManageRooms from './components/room/ManageRooms';
import Rooms from './components/watchtogether/Rooms';
import WatchTogether from './components/watchtogether/WatchTogether';
import { UserContext } from './context/UserContext';

function App() {
  const { setColorMode } = useColorMode();
  const context = useContext(UserContext);
  const { refresh, setTokens, setUser, tokens, isAdmin } = context;

  const toast = useToast();

  useEffect(() => {
    setColorMode('dark');
    refresh().catch(() => {
      setUser(null);
      setTokens(null);
    });

    const tenMinutes = 10 * 60 * 1000;
    const interval = setInterval(() => {
      if (tokens !== null) {
        refresh().catch(() =>
          toast({
            title: 'Something went wrong 🤔',
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        );
      }
    }, tenMinutes);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      // backgroundImage="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
      h="100vh"
      backgroundSize="cover"
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* BUG: Impossible to use routes below if it causes page reload */}
          {isAdmin && (
            <>
              <Route path="/admin/movies" element={<ManageMovies />} />
              <Route path="/admin/rooms" element={<ManageRooms />} />
            </>
          )}
          <Route path="/rooms" element={<Rooms />} />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                state={{
                  showNotAllowed: true,
                }}
              />
            }
          />
          <Route path="/watchtogether" element={<WatchTogether />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
