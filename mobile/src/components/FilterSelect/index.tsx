import React from 'react';
import { View, Text, PickerProps } from 'react-native';
import { Picker } from '@react-native-community/picker';

import styles from './styles';

interface OptionProp {
  value: string;
  label: string;
}

interface SelectProps extends PickerProps {
  label: string;
  placeholder: string;
  options?: Array<OptionProp>;
  value: string;
}

const FilterSelect: React.FC<SelectProps> = ({
  label,
  placeholder,
  value,
  options,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Picker style={styles.input} selectedValue={value} {...rest}>
        <Picker.Item label={placeholder} value={value} />
        {options &&
          options.map((option, index) => (
            <Picker.Item
              key={String(index)}
              label={option.label}
              value={option.value}
            />
          ))}
      </Picker>
    </View>
  );
};

export default FilterSelect;
