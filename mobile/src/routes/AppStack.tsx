import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import backImage from '../assets/images/icons/back.png';
import logoImage from '../assets/images/logo.png';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import TeacherList from '../pages/TeacherList';
import StudyTabs from './StudyTabs';
import Profile from '../pages/Profile';
import FinishedPage from '../pages/FinishedPage';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerBackImage: () => (
          <Image source={backImage} style={{ width: 25, height: 25 }} />
        ),
        headerTitleAlign: 'center',
        headerTintColor: '#D4C2FF',
        headerStyle: {
          backgroundColor: '#774DD6',
        },
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'Archivo_400Regular',
        },
        cardShadowEnabled: true,
        headerRight: () => (
          <Image
            source={logoImage}
            style={{ width: 33, height: 12, marginRight: 16 }}
          />
        ),
      }}
    >
      <Screen
        name="Landing"
        options={{
          headerShown: false,
        }}
        component={Landing}
      />
      <Screen
        name="GiveClasses"
        options={{
          headerTitle: 'Dar aulas',
        }}
        component={GiveClasses}
      />
      <Screen
        name="TeacherList"
        options={{
          headerTitle: 'Estudar',
        }}
        component={TeacherList}
      />
      <Screen
        name="StudyTabs"
        options={{
          headerTitle: 'Estudar',
        }}
        component={StudyTabs}
      />
      <Screen
        name="Profile"
        options={{
          headerTitle: 'Meu perfil',
        }}
        component={Profile}
      />
      <Screen
        name="Finished"
        options={{
          headerShown: false,
        }}
        component={FinishedPage}
      />
    </Navigator>
  );
};

export default AppStack;
