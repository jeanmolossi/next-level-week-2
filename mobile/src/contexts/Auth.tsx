import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  whatsapp: string;
  bio: string;
  avatar: string | null;
}

interface AuthUser {
  user: User;
  token: string;
}

interface LoginDataRequest {
  email: string;
  password: string;
  rememberPassword: boolean;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(data: LoginDataRequest): Promise<void>;
  signOut(): void;
  updateUser(newUser: Partial<User>): Promise<void>;
}

const authContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(
    async ({ email, password, rememberPassword = true }) => {
      api
        .post(`sessions`, {
          email,
          password,
          rememberPassword,
        })
        .then(response => {
          AsyncStorage.multiSet([
            ['@proffy:token', JSON.stringify(response.data.token)],
            ['@proffy:user', JSON.stringify(response.data.user)],
          ]).then(() => {
            setUser(response.data.user);

            api.defaults.headers.authorization = `Bearer ${response.data.token}`;
          });
        });
    },
    []
  );

  const signOut = useCallback(() => {
    AsyncStorage.multiRemove(['@proffy:token', '@proffy:user']).then(() => {
      setUser({} as User);
      console.log(user);
    });
  }, []);

  const updateUser = useCallback(
    async (newUser: Partial<User>) => {
      const userSession = await AsyncStorage.getItem('@proffy:user');

      if (userSession)
        await AsyncStorage.setItem(
          '@proffy:user',
          JSON.stringify({
            ...user,
            ...newUser,
          })
        );

      setUser((currentData: User) => {
        return {
          ...currentData,
          ...newUser,
        };
      });
    },
    [user]
  );

  useEffect(() => {
    setLoading(true);
    AsyncStorage.multiGet(['@proffy:token', '@proffy:user']).then(
      ([tokenKeyValue, userKeyValue]) => {
        if (tokenKeyValue[1] && userKeyValue[1]) {
          const token = JSON.parse(tokenKeyValue[1] || '');
          const userLoaded = JSON.parse(userKeyValue[1] || '');
          setUser(userLoaded);
          api.defaults.headers.authorization = `Bearer ${token}`;
        }
      }
    );
    setLoading(false);
  }, []);

  return (
    <authContext.Provider
      value={{ user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </authContext.Provider>
  );
};

function useAuth() {
  const context = useContext(authContext);

  if (!context) throw new Error('You must use the useAuth inside a provider');

  return context;
}

export { AuthProvider, useAuth };
