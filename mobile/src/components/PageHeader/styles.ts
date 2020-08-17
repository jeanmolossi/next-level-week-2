import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#8257e5',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 24,
    width: 240,
    marginVertical: 24,
  },

  headerDescription: {},

  headerText: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
});

export default styles;
