import React, { createContext, useContext, useCallback, useState, SetStateAction } from 'react';
import { verify } from 'jsonwebtoken';

import api from '../services/api';

interface AuthData {
  email: string;
  password: string;
  rememberPassword: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  lastname: string;
  whatsapp: string;
  bio: string;
  avatar: string;
}

interface AuthContextProps {
  user: User;
  signIn(data: AuthData): Promise<boolean>;
  signOut(): void;
  setUser: React.Dispatch<SetStateAction<User>>;
}

const authContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userStoraged = localStorage.getItem('@proffy:user');
    let tokenStoraged = localStorage.getItem('@proffy:token');

    if(!tokenStoraged)
      tokenStoraged = sessionStorage.getItem('@proffy:token');

    if(!tokenStoraged)
      return {} as User;

    const parsedToken = JSON.parse(tokenStoraged);

    if(!userStoraged)
      userStoraged = sessionStorage.getItem('@proffy:user');

    if(!userStoraged)
      return {} as User;

    api.defaults.headers.authorization = `Bearer ${parsedToken}`;

    const parsedUser = JSON.parse(userStoraged);

    if(!parsedUser.avatar)
      return {
        ...parsedUser,
        avatar: `https://api.adorable.io/avatars/160/${(parsedUser.name).toString().replace(/ /gim, '')}.png`
      } as User;

    return parsedUser;
  });

  const signIn = useCallback(async ({ email, password, rememberPassword}) => {
    return api.post(`sessions`, {
      email, password, rememberPassword
    })
      .then(response => {
        const { user, token } = response.data;

        const isTokenValid = verify(token, 'secret_key');
        if(!isTokenValid) throw new Error('Invalid token');

        if(rememberPassword){
          localStorage.setItem('@proffy:token', JSON.stringify(token));
          localStorage.setItem('@proffy:user', JSON.stringify(user));
        }else{
          sessionStorage.setItem('@proffy:token', JSON.stringify(token));
          sessionStorage.setItem('@proffy:user', JSON.stringify(user));
        }

        api.defaults.headers.authorization = `Bearer ${token}`
        setUser(user);

        return true;
      })
      .catch(err => {
        console.log('Não foi possível autenticar');
        return false;
      });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@proffy:user');
    localStorage.removeItem('@proffy:token');
    sessionStorage.removeItem('@proffy:user');
    sessionStorage.removeItem('@proffy:token');
    setUser({} as User);
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, signIn, signOut }}>
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
