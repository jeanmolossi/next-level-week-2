import React, { createContext, useContext, useState, useCallback } from 'react';

import api from '../services/api';
import { Teacher } from '../components/TeacherItem';

interface Schedule {
  id: number;
  week_day: number;
  from: number;
  to: number;
  class_id: number;
}

interface FavoritesContextData {
  favoritesList: Array<Teacher>;
  favoritesListIds: Array<number>;
  handleLoadFavorites(): void;
  handleAddFavorite(data: number): void;
  handleRemoveFavorite(data: number): void;
}

const favoritesContext = createContext({} as FavoritesContextData);

const FavoritesProvider: React.FC = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState([] as Teacher[]);
  const [favoritesListIds, setFavoritesListIds] = useState([] as number[]);

  const handleLoadFavorites = useCallback(() => {
    api.get(`favorites`).then(response => {
      const newFavoritesListIds = response.data.map((f: Teacher) => f.id);

      setFavoritesList(response.data);
      setFavoritesListIds(newFavoritesListIds);
    });
  }, []);

  const handleAddFavorite = useCallback(
    (favorite_user_id: number) => {
      api.post(`favorites`, { favorite_user_id }).then(_response => {
        const newFavoritesListIds = [...favoritesListIds, favorite_user_id];

        setFavoritesListIds(newFavoritesListIds);
      });
    },
    [handleLoadFavorites, favoritesListIds]
  );

  const handleRemoveFavorite = useCallback(
    (fav_id: number) => {
      api.delete(`favorites`, { params: { fav_id } }).then(_response => {
        setFavoritesListIds(oldList =>
          oldList.filter(favIds => favIds !== fav_id)
        );
      });
    },
    [handleLoadFavorites]
  );

  return (
    <favoritesContext.Provider
      value={{
        favoritesList,
        favoritesListIds,
        handleLoadFavorites,
        handleAddFavorite,
        handleRemoveFavorite,
      }}
    >
      {children}
    </favoritesContext.Provider>
  );
};

function useFavorites() {
  const context = useContext(favoritesContext);

  if (!context)
    throw new Error('You must use the hook useFavorites with a Provider');

  return context;
}

export { FavoritesProvider, useFavorites };
