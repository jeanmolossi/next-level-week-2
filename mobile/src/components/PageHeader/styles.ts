import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#8257e5'
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 24,
    width: 140,
    marginVertical: 24
  }

});

export default styles;