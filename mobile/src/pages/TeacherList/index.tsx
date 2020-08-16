import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import FilterSelect from '../../components/FilterSelect';

import api from '../../services/api';

import styles from './styles';
import { useFavorites } from '../../contexts/Favorites';

type FiltersType = 'classes/all' | 'classes';

const TeacherList: React.FC = () => {
  const { favoritesListIds, handleLoadFavorites } = useFavorites();

  const [teachers, setTeachers] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [reachedLastone, setReachedLastone] = useState(false);
  const [loadDebounce, setLoadDebounce] = useState(false);
  const [favorites] = useState(favoritesListIds);

  const [filters, setFilters] = useState('classes/all' as FiltersType);
  const [page, setPage] = useState(1);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState(() => {
    const nowTime = new Date();
    const minutes = nowTime.getMinutes();
    const hours = nowTime.getHours();

    return `${hours}:${minutes}`;
  });

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChangeDate = useCallback((e, selectedDate) => {
    setShow(false);

    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');

      setTime(`${hours}:${minutes}`);
      setDate(selectedDate || new Date());
    }
  }, []);

  const handleLoadTeachersList = useCallback(() => {
    api
      .get(`${filters}`, {
        params: {
          subject,
          week_day,
          time,
          page,
        },
      })
      .then(response => {
        const teachersList = response.data.map((singleTeacher: Teacher) => {
          return {
            ...singleTeacher,
            isFavorited: favorites.includes(singleTeacher.user.id),
          };
        });

        if (teachersList.length > 0) {
          setTeachers(currentList => {
            if (currentList.length > 0)
              return [...currentList, ...teachersList];
            return teachersList;
          });
        } else {
          setReachedLastone(true);
        }
        setLoadDebounce(false);
      });
  }, [filters, subject, week_day, time, page, favorites]);

  const handleToggleFiltersVisibility = useCallback(() => {
    setIsFiltersVisible(!isFiltersVisible);
  }, [isFiltersVisible]);

  const handleFiltersSubmit = useCallback(async () => {
    if (subject && week_day && time) {
      setFilters('classes');
      setReachedLastone(false);
      setPage(1);
      setTeachers([]);

      handleLoadFavorites();
      handleLoadTeachersList();
    }

    setIsFiltersVisible(false);
  }, [filters, subject, week_day, time, handleLoadFavorites]);

  const HeaderRight: React.FC = () => (
    <BorderlessButton onPress={handleToggleFiltersVisibility}>
      <Feather name="filter" size={20} color="#fff" />
    </BorderlessButton>
  );

  useFocusEffect(
    useCallback(() => {
      handleLoadFavorites();
      handleLoadTeachersList();

      return () => {};
    }, [handleLoadTeachersList, handleLoadFavorites])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" headerRight={<HeaderRight />}>
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <FilterSelect
              label="Matéria"
              labelTextStyle={[styles.label, { marginBottom: 4 }]}
              containerBoxStyle={styles.selectInputContainer}
              placeholder="Qual a matéria"
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
              onValueChange={itemValue => {
                setSubject(itemValue);
              }}
              value={subject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <FilterSelect
                  label="Dia da semana"
                  labelTextStyle={[styles.label, { marginBottom: 4 }]}
                  containerBoxStyle={styles.selectInputContainer}
                  placeholder="Qual o dia ?"
                  options={[
                    { label: 'Segunda', value: '1' },
                    { label: 'Terça', value: '2' },
                    { label: 'Quarta', value: '3' },
                    { label: 'Quinta', value: '4' },
                    { label: 'Sexta', value: '5' },
                  ]}
                  onValueChange={itemValue => {
                    setWeekDay(itemValue);
                  }}
                  value={week_day}
                />
              </View>

              <View style={styles.inputBlock}>
                <View>
                  <Text style={styles.label}>Horário</Text>
                  <RectButton
                    style={styles.input}
                    onPress={() => setShow(true)}
                  >
                    <Text>Horário</Text>
                  </RectButton>

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="time"
                      is24Hour
                      display="default"
                      onChange={onChangeDate}
                    />
                  )}
                </View>
              </View>
            </View>

            <RectButton
              style={styles.searchButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.searchButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <FlatList
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        data={teachers}
        keyExtractor={(data: Teacher, index) => index.toString()}
        renderItem={({ item: teacher }) => (
          <TeacherItem
            teacher={teacher}
            favorited={teacher.isFavorited || false}
          />
        )}
        onEndReached={() => {
          if (!reachedLastone && !loadDebounce) {
            setPage(state => state + 1);
            setLoadDebounce(true);
          }
        }}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default TeacherList;
