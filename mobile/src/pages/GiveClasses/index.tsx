import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

import PageHeader from '../../components/PageHeader';
import AuthInput from '../../components/AuthInput';
import Select from '../../components/FilterSelect';

import { useAuth } from '../../contexts/Auth';
import convertMinutesToHourString from '../../utils/convertMinutesToHourString';
import sanitizePhoneNumber from '../../utils/sanitizePhoneNumber';
import sanitizeCostValue from '../../utils/sanitizeCostValue';

import styles from './styles';
import api from '../../services/api';

interface PositionFieldProps {
  position: number;
  field: string;
}

const GiveClasses: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [bio, setBio] = useState(user.bio);

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('R$ 0');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 1, from: '08:00', to: '14:00' },
  ]);
  const [hasSchedule, setHasSchedule] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [positionField, setPositionField] = useState({} as PositionFieldProps);

  const setScheduleItemValue = useCallback(
    (position: number, field: string, value: string) => {
      const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
        if (position === index) {
          return { ...scheduleItem, [field]: value };
        }
        return scheduleItem;
      });

      setScheduleItems(updatedScheduleItems);
    },
    [scheduleItems]
  );

  const handleChangeTimeButton = useCallback(
    (position: number, field: string) => {
      setShowDatePicker(true);
      setPositionField({ position, field });
    },
    []
  );

  const handleChangeTime = useCallback(
    (_e, selectedDate: Date | undefined) => {
      setShowDatePicker(false);

      if (selectedDate) {
        const hours = selectedDate.getHours();
        const minutes = selectedDate.getMinutes();

        const parsedHour = hours.toString().padStart(2, '0');
        const parsedMinutes = minutes.toString().padStart(2, '0');

        const parsedTime = `${parsedHour}:${parsedMinutes}`;

        setScheduleItemValue(
          positionField.position,
          positionField.field,
          parsedTime
        );
      }
    },
    [positionField]
  );

  const handleAddNewScheduleItem = useCallback(() => {
    const dayStart = scheduleItems.length;
    setScheduleItems([
      ...scheduleItems,
      { week_day: dayStart, from: '', to: '' },
    ]);
  }, [scheduleItems]);

  const handleRemoveScheduleItem = useCallback(
    index => {
      scheduleItems.splice(index, 1);
      setScheduleItems([...scheduleItems]);
    },
    [scheduleItems]
  );

  const handleSaveIfExists = useCallback(() => {
    const costSanitized = sanitizeCostValue(cost);
    const whatsSanitized = sanitizePhoneNumber(whatsapp || '(__)');

    api
      .put(`profile/update`, {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        whatsapp: whatsSanitized,
        bio,
        subject,
        cost: costSanitized,
        schedules: scheduleItems,
      })
      .then(response => {
        alert('Atualização salva com sucesso!');
        updateUser({
          whatsapp: response.data.user.whatsapp,
          bio: response.data.user.bio,
        });
      });
  }, [whatsapp, bio, subject, cost, scheduleItems]);

  const handleCreateNewClass = useCallback(() => {
    const costSanitized = sanitizeCostValue(cost);
    const whatsSanitized = sanitizePhoneNumber(whatsapp || '(__)');

    api
      .post(`classes`, {
        bio,
        subject,
        cost: costSanitized,
        whatsapp: whatsSanitized,
        schedule: scheduleItems,
      })
      .then(response => {
        updateUser({
          bio: response.data.bio,
          whatsapp: response.data.whatsapp,
        });
      });
  }, [whatsapp, bio, subject, cost, scheduleItems]);

  const handleSaveOrCreate = useCallback(() => {
    if (!hasSchedule) {
      handleCreateNewClass();
      return;
    }
    handleSaveIfExists();
  }, [hasSchedule, handleCreateNewClass, handleSaveIfExists]);

  useEffect(() => {
    api.get(`profile`).then(response => {
      const {
        subject: responseSubject,
        cost: responseCost,
        schedules,
      } = response.data;

      const costToBrl = responseCost
        ? responseCost.toString().replace('.', ',')
        : 0.0;

      const parsedSchedules =
        schedules &&
        schedules.map((scheduleToParse: any) => ({
          ...scheduleToParse,
          from: convertMinutesToHourString(scheduleToParse.from),
          to: convertMinutesToHourString(scheduleToParse.to),
        }));

      setSubject(responseSubject);
      setCost(costToBrl);

      setScheduleItems(state => parsedSchedules || state);
      setHasSchedule(!!schedules);
    });
  }, [bio, whatsapp]);

  return (
    <ScrollView style={styles.container}>
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição"
      />

      <View style={styles.content}>
        <View style={styles.sectionData}>
          <Text style={styles.sectionDataTitle}>Seus dados</Text>

          <View style={styles.profileFixData}>
            <Image
              source={{ uri: user.avatar || undefined }}
              style={styles.profileFixDataImage}
            />
            <View style={styles.profileFixDataNameSubject}>
              <Text style={styles.profileFixDataName}>{user.name}</Text>
              <Text style={styles.profileFixDataSubject}>{subject}</Text>
            </View>
          </View>

          <View style={styles.inputsContainer}>
            <AuthInput
              label="Whatsapp"
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              maskedOptions={{
                type: 'cel-phone',
                options: {
                  maskType: 'BRL',
                },
              }}
              onChangeText={value => setWhatsapp(value)}
              value={whatsapp}
            />

            <AuthInput
              label="Biografia"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              onChangeText={value => setBio(value)}
              value={bio}
            />
          </View>
        </View>

        <View style={[styles.sectionData, { marginVertical: 24 }]}>
          <Text style={styles.sectionDataTitle}>Sobre a aula</Text>

          <View style={styles.inputsContainer}>
            <Select
              label="Matéria"
              labelTextStyle={styles.labelTextStyleSelect}
              containerBoxStyle={styles.containerBoxStyleSelect}
              placeholder="Qual matéria ?"
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciencias', label: 'Ciências' },
                { value: 'Portugues', label: 'Português' },
                { value: 'Educacao-fisica', label: 'Educação física' },
                { value: 'Fisica', label: 'Física' },
                { value: 'Matematica', label: 'Matemática' },
                { value: 'Quimica', label: 'Química' },
              ]}
              onValueChange={(itemValue, _) => setSubject(itemValue)}
              value={subject}
            />
            <AuthInput
              label="Custo da sua hora por aula"
              keyboardType="decimal-pad"
              onChangeText={value => setCost(value)}
              value={cost}
              maskedOptions={{
                type: 'money',
                options: {
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: 'R$ ',
                  suffixUnit: '',
                },
              }}
            />
          </View>
        </View>

        <View style={styles.sectionData}>
          <View style={styles.secionDataTitleView}>
            <Text style={styles.sectionDataTitleText}>
              Horários disponíveis
            </Text>
            <BorderlessButton
              style={styles.addScheduleButton}
              onPress={handleAddNewScheduleItem}
            >
              <Text style={styles.addScheduleButtonText}>+ Novo</Text>
            </BorderlessButton>
          </View>

          <View style={styles.inputsContainer}>
            {scheduleItems.map((schedule, index) => (
              <View
                style={styles.scheduleConfig}
                key={((1 + Math.random()) * 0x10000 || 0)
                  .toString(16)
                  .substring(1)}
              >
                <View style={styles.selectDaySchedule}>
                  <Select
                    label="Dia da semana"
                    labelTextStyle={styles.labelTextStyleSelect}
                    containerBoxStyle={styles.containerBoxStyleSelect}
                    placeholder="Qual dia ?"
                    value={schedule.week_day.toString()}
                    onValueChange={itemValue => {
                      setScheduleItemValue(index, 'week_day', itemValue);
                    }}
                    options={[
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                    ]}
                  />
                </View>
                <View style={styles.selectTimeSchedule}>
                  <View style={styles.selectTimeSchedulePicker}>
                    <Text style={styles.labelTextStyleSelect}>Das</Text>
                    <TouchableOpacity
                      style={styles.timeScheduleButton}
                      activeOpacity={0.5}
                      onPress={() => {
                        handleChangeTimeButton(index, 'from');
                      }}
                    >
                      <Text style={styles.timeScheduleButtonText}>
                        {schedule.from}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.selectTimeSchedulePicker}>
                    <Text style={styles.labelTextStyleSelect}>Até</Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.timeScheduleButton}
                      onPress={() => {
                        handleChangeTimeButton(index, 'to');
                      }}
                    >
                      <Text style={styles.timeScheduleButtonText}>
                        {schedule.to}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.removeSchedule}>
                  <RectButton
                    style={styles.removeScheduleButton}
                    rippleColor="#E33D3D"
                    onPress={_e => handleRemoveScheduleItem(index)}
                  >
                    <Text style={styles.removeScheduleButtonText}>
                      Excluir horário
                    </Text>
                  </RectButton>
                </View>
              </View>
            ))}
            {showDatePicker && (
              <DateTimePicker
                mode="time"
                is24Hour
                onChange={handleChangeTime}
                value={new Date()}
              />
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <RectButton
            style={styles.footerSaveButton}
            onPress={handleSaveOrCreate}
          >
            <Text style={styles.footerSaveButtonText}>Salvar alterações</Text>
          </RectButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default GiveClasses;
