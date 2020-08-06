import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import TeacherList from '../pages/TeacherList';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown: false
      }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="TeacherList" component={TeacherList} />
        <Screen name="StudyTabs" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;