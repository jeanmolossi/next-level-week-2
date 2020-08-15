import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface PageHeaderProps {
  title: string;
  headerRight?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight && headerRight}
      </View>

      {children}
    </View>
  );
};

export default PageHeader;
