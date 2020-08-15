import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../contexts/Auth';

import LoginStack from './LoginStack';
import AppStack from './AppStack';

enableScreens();

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#04d361" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user.token ? <AppStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Routes;
