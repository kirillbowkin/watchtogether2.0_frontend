import { Box, useToast } from '@chakra-ui/react';
import { React, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import ManageMovies from './components/ManageMovies';
import { UserContext } from './context/UserContext';

function App() {
  const context = useContext(UserContext);
  const { refresh, setTokens, setUser, tokens } = context;

  const toast = useToast();

  useEffect(() => {
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
    <Box>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
