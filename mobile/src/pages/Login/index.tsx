import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  CheckBox,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImg from '../../assets/images/give-classes-background.png';
import logoImg from '../../assets/images/logo.png';

import UnauthInput from '../../components/UnauthInput';

import { useAuth } from '../../contexts/Auth';

import styles from './styles';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false);

  const passwordRef = useRef({} as TextInput);

  const handleSubmitLogin = useCallback(async () => {
    setDisabled(true);

    await signIn({ email, password });

    setDisabled(false);
  }, [email, password, signIn]);

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

        <KeyboardAvoidingView style={styles.loginForm}>
          <View style={styles.loginHeader}>
            <Text style={styles.fieldset}>Fazer login</Text>
            <BorderlessButton
              style={styles.newAccButton}
              onPress={() => {
                navigate('CreateAccount');
              }}
            >
              <Text style={styles.newAccButtonText}>Criar uma conta</Text>
            </BorderlessButton>
          </View>

          <View style={styles.inputsForm}>
            <View style={styles.textInputs}>
              <UnauthInput
                label="E-mail"
                inputContainerAdditionalStyles={styles.topRoundedBorders}
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
              />

              <UnauthInput
                ref={passwordRef}
                label="Senha"
                inputContainerAdditionalStyles={styles.bottomRoundedBorders}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={() => handleSubmitLogin()}
              />
            </View>
          </View>

          <View style={styles.passwordSection}>
            <View style={styles.rememberPassword}>
              <CheckBox />
              <Text style={styles.rememberPasswordText}>Lembrar-me</Text>
            </View>
            <BorderlessButton
              style={styles.forgotPassword}
              onPress={() => {
                navigate('ForgotPassword');
              }}
            >
              <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
            </BorderlessButton>
          </View>

          <RectButton
            onPress={handleSubmitLogin}
            style={[
              styles.signInButton,
              !!email && !!password && !disabled
                ? styles.signInButtonEnabled
                : [],
            ]}
            rippleColor="#24EF7F"
          >
            <Text
              style={[
                styles.signInButtonText,
                !!email && !!password && !disabled
                  ? styles.signInButtonEnabledText
                  : [],
              ]}
            >
              Entrar
            </Text>
          </RectButton>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Login;
