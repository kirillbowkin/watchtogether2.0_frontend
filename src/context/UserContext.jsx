import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [tokens, setTokens] = useState(
    JSON.parse(localStorage.getItem('tokens'))
  );

  const refresh = async () => {
    return axios
      .post(`/login?refresh=${tokens?.refresh_token}`)
      .then(response => {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(user));

        setTokens(response.data.tokens);
        localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser, tokens, setTokens, refresh }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
