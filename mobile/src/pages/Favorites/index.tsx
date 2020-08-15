import React, { useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles';
import { useFavorites } from '../../contexts/Favorites';

const Favorites: React.FC = () => {
  const { favoritesList, handleLoadFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      handleLoadFavorites();

      return () => {};
    }, [handleLoadFavorites])
  );

  const EmptyList: React.FC = () => (
    <Text style={styles.notFoundFavoritesText}>
      Não encontramos nenhum favorito
    </Text>
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <FlatList
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        ListEmptyComponent={<EmptyList />}
        data={favoritesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: favorite }) => (
          <TeacherItem key={favorite.id} teacher={favorite} favorited />
        )}
      />
    </View>
  );
};

export default Favorites;
