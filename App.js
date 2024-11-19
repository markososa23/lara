

import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './navigation/authNav';
import GenNav from './navigation/genNav';

export const LoginContext = createContext();

export default function Mystack() {
  const [user, setUser] = useState('');

  return (
    <NavigationContainer>
      <LoginContext.Provider value={{ setUser, user }}>
        {user ? <AuthNav /> : <GenNav />}
      </LoginContext.Provider>
    </NavigationContainer>
  );
}