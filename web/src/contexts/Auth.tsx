import React, { createContext, useContext, useCallback, useState } from 'react';
import { verify } from 'jsonwebtoken';

import api from '../services/api';

interface AuthData {
  email: string;
  password: string;
  rememberPassword: boolean;
}

interface AuthContextProps {
  user: any;
  signIn(data: AuthData): Promise<boolean>;
}

const authContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({});

  const signIn = useCallback(async ({ email, password, rememberPassword}) => {
    return api.post(`sessions`, {
      email, password, rememberPassword
    })
      .then(response => {
        const isTokenValid = verify(response.data.token, 'secret_key');
        if(!isTokenValid) throw new Error('Invalid token');

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`

        setUser(response.data);
        return true;
      })
      .catch(err => {
        console.log('Não foi possível autenticar');
        return false;
      });
  }, []);

  return (
    <authContext.Provider value={{ signIn, user }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);

  if(!context){
    throw new Error('You need use auth context inside a provider')
  }
  return context;
}

export {AuthProvider, useAuth};