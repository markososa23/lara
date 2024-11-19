import { useState, useCallback, useContext } from 'react';
import loginService from '../services/LoginService';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CONSTANTS from '../App';

export default function useUser() {
  // Creamos el contexto de nuestra aplicación
  const { setUser } = useContext(CONSTANTS.LoginContext);
  //Utilizamos el estado para poder saber si está o no cargando
  const [state, setState] = useState({
    loading: true,
    error: false,
    logged: true,
  });

  const login = useCallback(
    ({ username, password }) => {
      loginService({ username, password })
        .then(async (jwt) => {
          try {
            await AsyncStorage.setItem('jwt', jwt);
            setUser(jwt);
            setState({ loading: true, error: false, logged: true });
          } catch (e) {
            alert('error');
          }
        })
        .catch((err) => {
          setState({ loading: false, error: true, logged: false });
          alert(err, 'error');
        });
    },
    [setUser, setState]
  );

  return {
    isLogged: state.logged,
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
  };
}