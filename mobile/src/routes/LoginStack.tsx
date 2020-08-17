import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import CreateAccount from '../pages/CreateAccount';
import FinishedPage from '../pages/FinishedPage';

const { Navigator, Screen } = createStackNavigator();

const LoginStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="CreateAccount" component={CreateAccount} />
      <Screen name="FinishedAction" component={FinishedPage} />
    </Navigator>
  );
};

export default LoginStack;
