import React, { createContext, useEffect, useState } from 'react';

export const MoviesContext = createContext();

function MoviesContextProvider(props) {
  const axios = require('axios');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);


  const getMovies = () => {
    axios
      .get(`/api/movies?page=${page}`)
      .then(resopnse => setMovies(resopnse.data));
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, getMovies }}>
      {props.children}
    </MoviesContext.Provider>
  );
}

export default MoviesContextProvider;
