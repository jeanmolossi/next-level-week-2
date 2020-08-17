import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: -24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
  },

  sectionData: {
    padding: 24,
  },

  sectionDataTitle: {
    fontSize: 22,
    fontFamily: 'Archivo_700Bold',
    borderBottomWidth: 1,
    borderColor: '#E6E6F0',
    marginBottom: 8,
    paddingBottom: 8,
  },

  inputsContainer: {},

  profileFixData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },

  profileFixDataImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  profileFixDataNameSubject: {
    flex: 1,
    marginLeft: 24,
  },

  profileFixDataName: {
    fontSize: 22,
    fontFamily: 'Archivo_700Bold',
    color: '#32264D',
  },

  profileFixDataSubject: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#32264D',
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
