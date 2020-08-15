import 'react-native-gesture-handler';
import React from 'react';
import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';

import Routes from './src/routes';
import AppProvider from './src/contexts';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AppProvider>
      <StatusBar style="light" />
      <Routes />
    </AppProvider>
  );
};

export default App;
