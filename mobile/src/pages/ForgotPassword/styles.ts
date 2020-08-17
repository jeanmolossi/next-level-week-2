import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },

  headerLogin: {
    width: '100%',
    flex: 1,
    maxHeight: 375,
    backgroundColor: '#8257E5',
  },

  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  logoImage: {
    width: 180,
    height: 47,
    resizeMode: 'contain',
  },

  logoBottomText: {
    maxWidth: 125,
    color: '#D4C2FF',
    marginTop: 16,
  },

  loginForm: {
    flex: 1,
    width: '100%',
    padding: 32,
  },

  backButton: {
    marginBottom: 24,
  },

  backButtonIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginHeader: {
    alignItems: 'flex-start',
  },

  fieldset: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
  },

  description: {
    color: '#6a6180',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginVertical: 16,
  },

  newAccButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  newAccButtonText: {
    color: '#8257E5',
  },

  inputsForm: {},

  textInputs: {},

  roundedBorders: {
    borderRadius: 8,
  },

  signInButton: {
    marginTop: 24,
    alignItems: 'center',
    backgroundColor: '#DCDCE5',
    paddingVertical: 16,
    borderRadius: 8,
  },

  signInButtonText: {
    color: '#9C98A6',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },

  signInButtonEnabled: {
    backgroundColor: '#04D361',
  },

  signInButtonEnabledText: {
    color: '#ffffff',
  },
});

export default styles;
