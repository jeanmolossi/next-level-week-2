import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface PageHeaderProps {
  title: string;
  description?: string;
  headerRight?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  headerRight,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight && headerRight}
      </View>
      <View style={styles.headerDescription}>
        <Text style={styles.headerText}>{description && description}</Text>
      </View>

      {children}
    </View>
  );
};

export default PageHeader;
