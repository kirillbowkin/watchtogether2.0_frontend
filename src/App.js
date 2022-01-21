import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import Movies from './components/Movies';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManageMovies from './components/ManageMovies';

function App() {
  return (
    <Box>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
