import React from 'react';
import {
  View,
  Text,
  PickerProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
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
  value: string | number;
  containerBoxStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
}

const FilterSelect: React.FC<SelectProps> = ({
  label,
  placeholder,
  value,
  options,
  containerBoxStyle = {},
  labelTextStyle = {},
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={[labelTextStyle]}>{label}</Text>

      <View style={[containerBoxStyle]}>
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
    </View>
  );
};

export default FilterSelect;
