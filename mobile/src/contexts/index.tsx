import React from 'react';

import { AuthProvider } from './Auth';
import { FavoritesProvider } from './Favorites';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </AuthProvider>
  );
};

export default AppProvider;
