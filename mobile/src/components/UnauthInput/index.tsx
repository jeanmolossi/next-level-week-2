import React, {
  useCallback,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { View, TextInput, Animated, TextInputProps } from 'react-native';

import styles from './styles';

interface InputProps extends TextInputProps {
  label: string;
  inputContainerAdditionalStyles?: object;
}

interface InputRefProps extends TextInput {
  isFilled?: boolean;
}

interface InputRef {
  focus(): void;
}

const UnauthInput: React.RefForwardingComponent<InputRef, InputProps> = (
  { label, inputContainerAdditionalStyles, secureTextEntry, value, ...rest },
  parentInputRef
) => {
  const labelAnimatedValues = {
    top: new Animated.Value(24),
    fontSize: new Animated.Value(14),
  };

  const leftBorderAnimatedValues = {
    top: new Animated.Value(24),
    height: new Animated.Value(0),
  };

  const inputRef = useRef({} as InputRefProps);

  const [stylesToApply] = useState(() => {
    if (inputContainerAdditionalStyles)
      return [styles.container, inputContainerAdditionalStyles];
    return styles.container;
  });

  const handleStartAnimations = useCallback(
    (focused = false) => {
      const animations = {
        labelTopPosition: Animated.timing(labelAnimatedValues.top, {
          toValue: !!value || focused ? 5 : 24,
          duration: 200,
          useNativeDriver: false,
        }),
        labelFontSize: Animated.timing(labelAnimatedValues.fontSize, {
          toValue: !!value || focused ? 10 : 14,
          duration: 200,
          useNativeDriver: false,
        }),
        leftBorderTopPosition: Animated.timing(leftBorderAnimatedValues.top, {
          toValue: !!value || focused ? 10 : 24,
          duration: 200,
          useNativeDriver: false,
        }),
        leftBorderHeight: Animated.timing(leftBorderAnimatedValues.height, {
          toValue: !!value || focused ? 44 : 0,
          duration: 200,
          useNativeDriver: false,
        }),
      };

      animations.labelTopPosition.start();
      animations.labelFontSize.start();
      animations.leftBorderTopPosition.start();
      animations.leftBorderHeight.start();
    },
    [value, labelAnimatedValues, leftBorderAnimatedValues]
  );

  const handleFocus = useCallback(() => {
    handleStartAnimations(true);
  }, [handleStartAnimations]);

  const handleBlur = useCallback(() => {
    handleStartAnimations();
  }, [handleStartAnimations]);

  const handleAnimateLabel = useCallback(() => {
    return {
      top: labelAnimatedValues.top.interpolate({
        inputRange: [5, 24],
        outputRange: [5, 24],
      }),
      fontSize: labelAnimatedValues.fontSize.interpolate({
        inputRange: [10, 14],
        outputRange: [10, 14],
      }),
    };
  }, [labelAnimatedValues]);

  const handleAnimateLabelLeftBorder = useCallback(() => {
    return {
      top: leftBorderAnimatedValues.top.interpolate({
        inputRange: [10, 24],
        outputRange: [10, 24],
      }),
      height: leftBorderAnimatedValues.height.interpolate({
        inputRange: [0, 48],
        outputRange: [0, 48],
      }),
    };
  }, [leftBorderAnimatedValues]);

  useImperativeHandle(parentInputRef, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  return (
    <View style={stylesToApply}>
      <TextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      <Animated.View
        style={[styles.leftBorderAnimation, handleAnimateLabelLeftBorder()]}
      />

      <Animated.Text
        style={[styles.floatingLabel, handleAnimateLabel()]}
        onPress={() => inputRef.current.focus()}
      >
        {label}
      </Animated.Text>
    </View>
  );
};

export default forwardRef(UnauthInput);
