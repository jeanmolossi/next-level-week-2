import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import giveClassesBgImg from '../../assets/images/give-classes-background.png';
import logoImg from '../../assets/images/logo.png';

import UnauthInput from '../../components/UnauthInput';

import styles from './styles';
import api from '../../services/api';

const ForgotPassword: React.FC = () => {
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');

  const [dinamicButtonText, setDinamicButtonText] = useState('Enviar');
  const [disabled, setDisabled] = useState(false);

  const handleSubmitEmail = useCallback(async () => {
    setDisabled(true);
    setDinamicButtonText('Enviando...');
    if (email) {
      api
        .post(`password/forgot`, { email })
        .then(_response => {
          navigate('FinishedAction', {
            title: 'Redefinição enviada!',
            description:
              'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.',
            textButton: 'Voltar ao login',
            screen: 'Login',
          });
          setDisabled(false);
          setDinamicButtonText('Enviar');
        })
        .catch(() => {
          alert('Não foi possível recuperar a senha');
          setDisabled(false);
          setDinamicButtonText('Enviar');
        });
    }
  }, [email]);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerLogin}>
          <ImageBackground
            style={styles.bgImg}
            source={giveClassesBgImg}
            resizeMode="repeat"
          >
            <Image
              style={styles.logoImage}
              source={logoImg}
              resizeMode="contain"
            />
            <Text style={styles.logoBottomText}>
              Sua plataforma de estudos online.
            </Text>
          </ImageBackground>
        </View>

        <KeyboardAvoidingView style={styles.loginForm} behavior="padding">
          <View style={styles.backButton}>
            <RectButton
              style={styles.backButtonIcon}
              onPress={() => navigate('Login')}
              rippleColor="#9c98a6"
            >
              <Feather name="arrow-left" size={24} color="#9C98A6" />
            </RectButton>
          </View>

          <View style={styles.loginHeader}>
            <Text style={styles.fieldset}>Esqueceu sua senha ?</Text>
            <Text style={styles.description}>
              Não esquenta, {'\n'}
              vamos dar um jeito nisso.
            </Text>
          </View>

          <View style={styles.inputsForm}>
            <View style={styles.textInputs}>
              <UnauthInput
                label="E-mail"
                inputContainerAdditionalStyles={styles.roundedBorders}
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={handleSubmitEmail}
              />
            </View>
          </View>

          <RectButton
            onPress={handleSubmitEmail}
            style={[
              styles.signInButton,
              !!email && !disabled ? styles.signInButtonEnabled : [],
            ]}
            enabled={!!email && !disabled}
          >
            <Text
              style={[
                styles.signInButtonText,
                !!email && !disabled ? styles.signInButtonEnabledText : [],
              ]}
            >
              {dinamicButtonText}
            </Text>
          </RectButton>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
