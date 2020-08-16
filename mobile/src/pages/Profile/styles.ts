import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},

  header: {
    width: '100%',
    height: 340,
    flex: 1,
    backgroundColor: '#8257E5',
    marginBottom: -40,
  },

  headerBackgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarBox: {
    width: 140,
    height: 140,
    position: 'relative',
  },

  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 90,
  },

  avatarCameraButton: {
    backgroundColor: '#04D361',
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
  },

  infoBox: {
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'center',
  },

  infoBoxName: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 24,
    color: '#fff',
  },

  infoBoxSubject: {
    color: '#D4C2FF',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginVertical: 6,
  },

  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -10,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
  },

  sectionData: {
    paddingHorizontal: 24,
  },

  sectionDataTitle: {
    fontSize: 22,
    fontFamily: 'Archivo_700Bold',
    borderBottomWidth: 1,
    borderColor: '#E6E6F0',
    paddingBottom: 4,
    marginBottom: 24,
  },

  secionDataTitleView: {
    borderBottomWidth: 1,
    borderColor: '#E6E6F0',
    paddingBottom: 4,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionDataTitleText: {
    fontSize: 22,
    fontFamily: 'Archivo_700Bold',
  },

  addScheduleButton: {
    padding: 8,
    borderRadius: 8,
  },

  addScheduleButtonText: {
    color: '#8257E5',
    fontFamily: 'Archivo_700Bold',
    fontSize: 14,
  },

  inputsContainer: {},

  scheduleConfig: {
    marginBottom: 24,
  },

  selectDaySchedule: {},

  containerBoxStyleSelect: {
    backgroundColor: '#FAFAFC',
    borderColor: '#E6E6F0',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },

  labelTextStyleSelect: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
  },

  selectTimeSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectTimeSchedulePicker: {
    width: '49%',
    marginTop: 16,
  },

  timeSchedulePickerText: {},

  timeScheduleButton: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    backgroundColor: '#FAFAFC',
    borderColor: '#E6E6F0',
    borderWidth: 1,
    borderRadius: 8,

    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  timeScheduleButtonText: {},

  removeSchedule: {},

  removeScheduleButton: {
    marginVertical: 16,
    borderRadius: 8,
  },

  removeScheduleButtonText: {
    textAlign: 'center',
    color: '#E33D3D',
    fontFamily: 'Archivo_700Bold',
    fontSize: 12,
  },

  footer: {
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    justifyContent: 'center',
    height: 105,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderColor: '#E6E6F0',
    padding: 24,
  },

  footerSaveButton: {
    backgroundColor: '#04D361',
    width: '100%',
    borderRadius: 8,
  },

  footerSaveButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginVertical: 16,
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },
});

export default styles;
