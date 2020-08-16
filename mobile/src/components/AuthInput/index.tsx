import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import styles from './styles';

interface AuthInputProps extends TextInputProps {
  label: string;
  maskedOptions?: TextInputMaskProps;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  maskedOptions,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      {maskedOptions ? (
        <TextInputMask
          type={maskedOptions.type}
          options={maskedOptions.options}
          style={styles.inputStyle}
          {...rest}
        />
      ) : (
        <TextInput style={styles.inputStyle} {...rest} />
      )}
    </View>
  );
};

export default AuthInput;
