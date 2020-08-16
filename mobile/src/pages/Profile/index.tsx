import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import headerBg from '../../assets/images/give-classes-background.png';

import AuthInput from '../../components/AuthInput';
import Select from '../../components/FilterSelect';

import { useAuth } from '../../contexts/Auth';
import api from '../../services/api';
import convertMinutesToHourString from '../../utils/convertMinutesToHourString';

import styles from './styles';

interface PositionFieldProps {
  position: number;
  field: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [bio, setBio] = useState(user.bio);

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('R$ 0');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 1, from: '08:00', to: '14:00' },
  ]);

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

  const handleUpdateAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const avatarData = new FormData();
        const avatar = e.target.files[0];

        avatarData.append('avatar', avatar);

        api.patch(`avatar/update`, avatarData).then(response => {
          updateUser({
            avatar: response.data.avatar,
          });
        });
      }
    },
    [updateUser]
  );

  const handleUpdateProfile = useCallback(() => {
    const costSanitize = cost || 'R$ 0,00';
    const whatsSanitize = whatsapp || '(__)';

    const costSanitized = Number(
      costSanitize.replace(/(r\$|( )|'.')/gim, '').replace(',', '.')
    );
    const whatsSanitized = whatsSanitize.replace(/(\(|\)|( )|_)/gim, '');

    console.log({
      name,
      lastname,
      email,
      whatsapp: whatsSanitized,
      bio,
      subject,
      cost: costSanitized,
      schedules: scheduleItems,
    });

    // api
    //   .put(`profile/update`, {
    //     name,
    //     lastname,
    //     email,
    //     whatsapp: whatsSanitized,
    //     bio,
    //     subject,
    //     cost: costSanitized,
    //     schedules: scheduleItems,
    //   })
    //   .then(response => {
    //     alert('Atualização salva com sucesso!');
    //     updateUser({
    //       name,
    //       lastname,
    //       email,
    //       whatsapp,
    //       bio,
    //     });
    //   });
  }, [
    bio,
    cost,
    email,
    lastname,
    name,
    scheduleItems,
    subject,
    updateUser,
    whatsapp,
  ]);

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
    });
  }, [bio, email, lastname, name, whatsapp]);

  const parsedAvatar = useMemo(() => {
    return (
      user.avatar || `https://api.adorable.io/avatars/180/placeholderAvatar.png`
    );
  }, [user.avatar]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
    >
      <View style={styles.header}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          source={headerBg}
          resizeMode="contain"
        >
          <View style={styles.avatarBox}>
            <Image source={{ uri: parsedAvatar }} style={styles.avatarImage} />
            <RectButton style={styles.avatarCameraButton}>
              <Feather name="camera" size={20} color="#ffffff" />
            </RectButton>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoBoxName}>{user.name}</Text>
            <Text style={styles.infoBoxSubject}>{subject}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <View style={[styles.sectionData, { marginTop: 24 }]}>
          <Text style={styles.sectionDataTitle}>Seus dados</Text>

          <View style={styles.inputsContainer}>
            <AuthInput
              label="Nome"
              onChangeText={value => setName(value)}
              value={name}
            />

            <AuthInput
              label="Sobrenome"
              onChangeText={value => setLastname(value)}
              value={lastname}
            />

            <AuthInput
              label="E-mail"
              onChangeText={value => setEmail(value)}
              value={email}
            />

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
            onPress={handleUpdateProfile}
          >
            <Text style={styles.footerSaveButtonText}>Salvar alterações</Text>
          </RectButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
