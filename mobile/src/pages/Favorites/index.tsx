import React, { useCallback, useState } from 'react';
import { View,  ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([] as Teacher[]);

  const handleLoadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response);
        
        setFavorites(favoritedTeachers);
      }      
    })
  }, [AsyncStorage])

  useFocusEffect(() => {
    handleLoadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
      

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map(favorite => (
          <TeacherItem
            key={favorite.id}
            teacher={favorite}
            favorited
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;