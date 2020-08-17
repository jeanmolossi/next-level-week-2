import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import UnauthInput from '../../components/UnauthInput';
import api from '../../services/api';

// import { Container } from './styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },

  headLine: {
    padding: 32,
    flex: 1,
    justifyContent: 'center',
  },

  headLineTitle: {
    color: '#32264D',
    fontSize: 32,
    fontFamily: 'Poppins_600SemiBold',
    marginVertical: 32,
  },

  headLineDescription: {
    color: '#32264D',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },

  formWhoAreYou: {
    padding: 32,
    marginBottom: 52,
  },

  formTitle: {
    color: '#32264D',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 24,
  },

  formBox: {},

  nextButton: {
    backgroundColor: '#DCDCE5',
    marginTop: 24,
    borderRadius: 8,
    paddingVertical: 16,
  },

  nextButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
    color: '#9C98A6',
  },
});

const CreateAccount: React.FC = () => {
  const { navigate } = useNavigation();

  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const lastnameInputRef = useRef<TextInput>({} as TextInput);
  const emailInputRef = useRef<TextInput>({} as TextInput);
  const passwordInputRef = useRef<TextInput>({} as TextInput);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNextPress = useCallback(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.getNode().scrollTo({
        x: width * 2,
        animated: true,
      });

      setTimeout(() => emailInputRef.current.focus(), 500);
    }
  }, [scrollViewRef, name, email]);

  const handleSubmitCreateAccountForm = useCallback(() => {
    api.post(`users`, { name, lastname, email, password }).then(_response => {
      navigate('FinishedAction', {
        title: 'Cadastro concluído!',
        description: 'Agora você faz parte da plataforma Proffy!',
        textButton: 'Fazer login',
        screen: 'Login',
      });
    });
  }, [name, lastname, email, password]);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.scrollContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          bounces={false}
        >
          <KeyboardAvoidingView behavior="height" style={{ flex: 1, width }}>
            <View style={styles.headLine}>
              <Text style={styles.headLineTitle}>
                Crie sua {'\n'}
                conta gratuita
              </Text>
              <Text style={styles.headLineDescription}>
                Basta preencher esses dados {'\n'}e você estará conosco.
              </Text>
            </View>

            <View style={styles.formWhoAreYou}>
              <Text style={styles.formTitle}>01. Quem é você ?</Text>
              <View style={styles.formBox}>
                <UnauthInput
                  label="Nome"
                  inputContainerAdditionalStyles={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomWidth: 0,
                  }}
                  value={name}
                  onChangeText={value => setName(value)}
                  returnKeyType="next"
                  onEndEditing={() => {
                    lastnameInputRef.current.focus();
                  }}
                />
                <UnauthInput
                  ref={lastnameInputRef}
                  label="Sobrenome"
                  inputContainerAdditionalStyles={{
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                  value={lastname}
                  onChangeText={value => setLastname(value)}
                  returnKeyType="next"
                  onEndEditing={handleNextPress}
                />

                <RectButton
                  style={[
                    styles.nextButton,
                    !!name && !!lastname ? { backgroundColor: '#8257E5' } : [],
                  ]}
                  enabled={!!name && !!lastname}
                  onPress={handleNextPress}
                >
                  <Text
                    style={[
                      styles.nextButtonText,
                      !!name && !!lastname ? { color: '#fff' } : [],
                    ]}
                  >
                    Próximo
                  </Text>
                </RectButton>
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={{ flex: 1, width }}>
            <KeyboardAvoidingView
              style={[
                styles.formWhoAreYou,
                { flex: 1, justifyContent: 'center' },
              ]}
              behavior="height"
            >
              <Text style={styles.formTitle}>02. Email e senha</Text>
              <View style={styles.formBox}>
                <UnauthInput
                  ref={emailInputRef}
                  label="E-mail"
                  inputContainerAdditionalStyles={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomWidth: 0,
                  }}
                  value={email}
                  onChangeText={value => setEmail(value)}
                />
                <UnauthInput
                  ref={passwordInputRef}
                  label="Senha"
                  inputContainerAdditionalStyles={{
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                  secureTextEntry
                  value={password}
                  onChangeText={value => setPassword(value)}
                />

                <RectButton
                  style={[
                    styles.nextButton,
                    !!email && !!password ? { backgroundColor: '#04D361' } : [],
                  ]}
                  enabled={!!email && !!password}
                  onPress={handleSubmitCreateAccountForm}
                >
                  <Text
                    style={[
                      styles.nextButtonText,
                      !!email && !!password ? { color: '#fff' } : [],
                    ]}
                  >
                    Concluir cadastro
                  </Text>
                </RectButton>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};

export default CreateAccount;
