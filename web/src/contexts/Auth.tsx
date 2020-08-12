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
  signIn(data: AuthData): Promise<void>;
  signOut(): void;
  updateUser(newUser: Partial<User>): void;
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

    return parsedUser;
  });

  const signIn = useCallback(async ({ email, password, rememberPassword}) => {
    api.post(`sessions`, {
      email, password, rememberPassword
    })
      .then(response => {
        const { user, token } = response.data;

        const isTokenValid = verify(token, 'secret_key');
        if(!isTokenValid) throw new Error('Invalid token');

        if(!user.avatar)
          user.avatar = `https://api.adorable.io/avatars/160/${(user.name).toString().replace(/ /gim, '')}.png`;

        if(rememberPassword){
          localStorage.setItem('@proffy:token', JSON.stringify(token));
          localStorage.setItem('@proffy:user', JSON.stringify(user));
        }else{
          sessionStorage.setItem('@proffy:token', JSON.stringify(token));
          sessionStorage.setItem('@proffy:user', JSON.stringify(user));
        }
        console.log({user, token})

        api.defaults.headers.authorization = `Bearer ${token}`
        setUser(user);
      })
      .catch(err => {
        console.log('Não foi possível autenticar');
      });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@proffy:user');
    localStorage.removeItem('@proffy:token');
    sessionStorage.removeItem('@proffy:user');
    sessionStorage.removeItem('@proffy:token');
    setUser({} as User);
  }, []);

  const updateUser = useCallback((newUser: Partial<User>) => {
    const userSession = sessionStorage.getItem('@proffy:user');

    if(userSession)
      sessionStorage.setItem('@proffy:user', JSON.stringify({
        ...user,
        ...newUser
      }));

    const userStoraged = localStorage.getItem('@proffy:user');
    if(userStoraged)
      localStorage.setItem('@proffy:user', JSON.stringify({
        ...user,
        ...newUser
      }));

    setUser((currentData: Partial<User>) => ({
      ...currentData,
      ...newUser
    }))
  }, [user]);

  return (
    <authContext.Provider value={{ user, updateUser, signIn, signOut }}>
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
