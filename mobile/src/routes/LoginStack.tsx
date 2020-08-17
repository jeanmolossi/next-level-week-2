import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator } from 'react-native';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import CreateAccount from '../pages/CreateAccount';
import FinishedPage from '../pages/FinishedPage';
import FirstEntrySlide from '../pages/FirstEntrySlide';
import styles from '../components/UnauthInput/styles';

const { Navigator, Screen } = createStackNavigator();

const LoginStack: React.FC = () => {
  const [firstEntry, setFirstEntry] = useState('isFirstEntry');

  useEffect(() => {
    async function isFirstEntry() {
      const firstEntryLoader = await AsyncStorage.getItem('@proffy:firstEntry');
      // const firstEntryLoader = await AsyncStorage.clear();

      if (firstEntryLoader) {
        setFirstEntry(JSON.parse(firstEntryLoader));
      }
    }

    isFirstEntry();
  }, []);

  return (
    <Navigator
      screenOptions={{
        headerTitle: '',
        headerBackImage: () => (
          <Feather name="arrow-left" size={24} color="#9C98A6" />
        ),
        headerLeftContainerStyle: {
          marginLeft: 16,
        },
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
    >
      {firstEntry === 'isFirstEntry' && (
        <Screen
          name="FirstEntry"
          options={{
            headerShown: false,
          }}
          component={FirstEntrySlide}
        />
      )}

      <Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={Login}
      />
      <Screen
        name="ForgotPassword"
        options={{
          headerShown: false,
        }}
        component={ForgotPassword}
      />
      <Screen name="CreateAccount" component={CreateAccount} />
      <Screen
        name="FinishedAction"
        options={{
          headerShown: false,
        }}
        component={FinishedPage}
      />
    </Navigator>
  );
};

export default LoginStack;
