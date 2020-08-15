import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257e5',
    justifyContent: 'center',
    padding: 40,
  },

  profileHead: {
    marginVertical: 32,
    height: 40,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileButton: {
    maxWidth: 180,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },

  profileName: {
    color: '#D4C2FF',
  },

  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#774DD6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },

  banner: {
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 40,
  },
  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 20,
  },

  buttonPrimary: {
    backgroundColor: '#9871f5',
  },
  buttonSecondary: {
    backgroundColor: '#04d361',
  },
  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40,
  },
});

export default styles;
