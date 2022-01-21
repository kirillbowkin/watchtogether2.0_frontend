import React, { createContext, useState } from 'react';

export const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [tokens, setTokens] = useState(JSON.parse(localStorage.getItem('tokens')))

  return (
    <UserContext.Provider value={{ user, setUser, tokens, setTokens }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;