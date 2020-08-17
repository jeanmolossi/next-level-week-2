import React, { useCallback } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import background from '../../assets/images/give-classes-background.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8257E5',
    padding: 40,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkIcon: {
    borderWidth: 4,
    borderColor: '#04D361',
    padding: 18,
    borderRadius: 24,
  },

  title: {
    fontSize: 32,
    fontFamily: 'Archivo_700Bold',
    color: '#ffffff',
    marginTop: 24,
    textAlign: 'center',
    flexShrink: 1,
  },

  description: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
    textAlign: 'center',
    marginTop: 16,
    width: 260,
  },

  finishButton: {
    backgroundColor: '#04D361',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },

  finishButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

interface RouteProps {
  title: string;
  description: string;
  textButton: string;
  screen: string;
}

const FinishedPage: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { title, description, textButton, screen } = params as RouteProps;

  const handleFinishedPressed = useCallback(() => {
    navigation.reset({
      routes: [{ name: screen }],
      index: 0,
    });

    navigation.navigate(screen);
  }, [navigation.navigate, navigation.reset, screen]);

  return (
    <ImageBackground
      source={background}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <View style={styles.checkIcon}>
          <Feather name="check" size={25} color="#04D361" />
        </View>

        <Text style={styles.title}>{title || 'Título!'}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>

      <RectButton onPress={handleFinishedPressed} style={styles.finishButton}>
        <Text style={styles.finishButtonText}>{textButton}</Text>
      </RectButton>
    </ImageBackground>
  );
};

export default FinishedPage;
