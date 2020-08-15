import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoritesIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import hourArrow from '../../assets/images/icons/horario.png';

import api from '../../services/api';
import convertMinutesToHourString from '../../utils/convertMinutesToHourString';

import styles from './styles';
import { useAuth } from '../../contexts/Auth';
import { useFavorites } from '../../contexts/Favorites';

interface User {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  whatsapp: string;
}

interface Schedule {
  week_day: number;
  from: number;
  to: number;
}

export interface Teacher {
  id: number;
  user: User;
  subject: string;
  cost: number;
  schedules: Schedule[];
  isFavorited?: boolean;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const { user } = useAuth();
  const {
    handleAddFavorite,
    handleRemoveFavorite,
    favoritesListIds,
  } = useFavorites();

  const [isFavorited, setIsFavorited] = useState(favorited);

  const parsedSchedules = useMemo(() => {
    const week_days = [
      {
        day: 1,
        week_day: 'Segunda',
      },
      {
        day: 2,
        week_day: 'Terça',
      },
      {
        day: 3,
        week_day: 'Quarta',
      },
      {
        day: 4,
        week_day: 'Quinta',
      },
      {
        day: 5,
        week_day: 'Sexta',
      },
    ];

    const parsed = week_days.map(day => {
      const schedule = teacher.schedules.find(
        scheduleObject => scheduleObject.week_day === day.day
      );

      const week_day_parsed = day.week_day;

      if (!schedule)
        return {
          week_day: day.week_day,
        };

      const fromTimeString = `${convertMinutesToHourString(schedule.from)}`;
      const toTimeString = `${convertMinutesToHourString(schedule.to)}`;
      const time_parsed = `${fromTimeString} - ${toTimeString}`;

      return {
        week_day: week_day_parsed,
        time: time_parsed,
      };
    });

    return parsed;
  }, [teacher.schedules]);

  const avatar = useMemo(() => {
    return teacher.user.avatar
      ? `http://192.168.0.104:3333/files/${teacher.user.avatar}`
      : `https://api.adorable.io/avatars/60/${teacher.user.name.replace(
          /( )+/gim,
          ''
        )}`;
  }, [teacher.user.avatar]);

  const price = useMemo(() => {
    const hourValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(teacher.cost);

    return hourValue;
  }, [teacher.cost]);

  const handleCreateConnection = useCallback(() => {
    api.post(`connections`, { user_id: teacher.id });
  }, [teacher.id]);

  const handleLinkToWhatsapp = useCallback(() => {
    handleCreateConnection();
    Linking.openURL(`whatsapp://send?phone=+55${teacher.user.whatsapp}`);
  }, [handleCreateConnection]);

  const handleToggleFavorite = useCallback(async () => {
    if (!isFavorited) {
      handleAddFavorite(teacher.user.id);
    } else {
      handleRemoveFavorite(teacher.user.id);
    }
  }, [isFavorited]);

  useEffect(() => {
    setIsFavorited(favoritesListIds.includes(teacher.user.id));
  }, [favoritesListIds]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.user.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.user.bio}</Text>

      <View style={styles.schedules}>
        <View style={styles.schedulesLabels}>
          <Text style={styles.schedulesLabelsText}>Dia</Text>
          <Text style={styles.schedulesLabelsText}>Horário</Text>
        </View>
        {parsedSchedules.map(schedule => (
          <View
            key={schedule.week_day}
            style={[
              styles.singleDay,
              schedule.time ? [] : styles.singleDayDisabled,
            ]}
          >
            <Text style={styles.singleDayText}>{schedule.week_day}</Text>
            <Image source={hourArrow} />
            <Text style={styles.singleDayText}>
              {schedule.time ? schedule.time : '-'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço da minha hora {'  '}
          <Text style={styles.priceValue}>{price} reais</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          {teacher.user.id === user.user.id ? (
            <View />
          ) : (
            <RectButton
              onPress={handleToggleFavorite}
              style={[
                styles.favoriteButton,
                isFavorited ? styles.favorited : {},
              ]}
            >
              {isFavorited ? (
                <Image source={unfavoritesIcon} />
              ) : (
                <Image source={heartOutlineIcon} />
              )}
            </RectButton>
          )}

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
