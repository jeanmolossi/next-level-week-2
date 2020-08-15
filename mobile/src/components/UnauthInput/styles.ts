import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFC',
    height: 64,
    borderColor: '#E6E6F0',
    borderWidth: 1,
    position: 'relative',
  },

  input: {
    flex: 1,
    color: '#9C98A6',
    fontFamily: 'Poppins_400Regular',
    marginTop: 24,
    borderWidth: 0,
    paddingHorizontal: 24,
  },

  leftBorderAnimation: {
    position: 'absolute',
    top: 10,
    left: -1,
    width: 3,
    borderRadius: 2,
    backgroundColor: '#8257E5',
  },

  floatingLabel: {
    color: '#9C98A6',
    position: 'absolute',
    left: 24,
    fontFamily: 'Poppins_400Regular',
  },
});

export default styles;
