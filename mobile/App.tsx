import 'react-native-gesture-handler';
import React from 'react';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';

import AppStack from './src/routes/AppStack';

const App: React.FC = () => {
  
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (    
    <>
      <StatusBar style="light" />
      <AppStack />
    </>    
  );  
  
}

export default App;