import { Box } from '@chakra-ui/react';
import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import ManageMovies from './components/ManageMovies';

function App() {
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
