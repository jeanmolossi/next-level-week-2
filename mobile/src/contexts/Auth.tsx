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
  avatar: string | null;
}

interface AuthUser {
  user: User;
  token: string;
}

interface LoginDataRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  user: AuthUser;
  loading: boolean;
  signIn(data: LoginDataRequest): Promise<void>;
  signOut(): void;
}

const authContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthUser>({} as AuthUser);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async ({ email, password }) => {
    api
      .post(`sessions`, {
        email,
        password,
      })
      .then(response => {
        AsyncStorage.multiSet([
          ['@proffy:token', JSON.stringify(response.data.token)],
          ['@proffy:user', JSON.stringify(response.data.user)],
        ]).then(() => {
          setUser({
            user: response.data.user,
            token: response.data.token,
          });

          api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        });
      });
  }, []);

  const signOut = useCallback(() => {
    AsyncStorage.multiRemove(['@proffy:token', '@proffy:user']).then(() => {
      setUser({} as AuthUser);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.multiGet(['@proffy:token', '@proffy:user']).then(
      ([tokenKeyValue, userKeyValue]) => {
        if (tokenKeyValue[1] && userKeyValue[1]) {
          const token = JSON.parse(tokenKeyValue[1] || '');
          const userLoaded = JSON.parse(userKeyValue[1] || '');
          setUser({
            user: userLoaded,
            token,
          });
          api.defaults.headers.authorization = `Bearer ${token}`;
        }
      }
    );
    setLoading(false);
  }, []);

  return (
    <authContext.Provider value={{ user, loading, signIn, signOut }}>
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
