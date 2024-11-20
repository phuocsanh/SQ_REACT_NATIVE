import React from 'react';
import {Pressable, PressableProps, Text} from 'components';
import {COLORS} from 'theme';

import {ActivityIndicator, StyleProp, TextStyle} from 'react-native';

export type ButtonProps = {
  title: string;
  loading?: boolean;
  color?: string;
  colorIndicator?: string;
  styleText?: StyleProp<TextStyle>;
} & PressableProps;

export const Button = ({
  title = '',
  loading,
  height = 50,
  disabled,
  backgroundColor = COLORS.primary,
  marginHorizontal = 0,
  color = COLORS.white,
  colorIndicator = COLORS.white,
  styleText,
  ...containerProps
}: ButtonProps) => {
  return (
    <Pressable
      radius={10}
      backgroundColor={backgroundColor}
      alignItems="center"
      justifyContent="center"
      height={height}
      marginHorizontal={marginHorizontal}
      disabled={loading || disabled}
      {...containerProps}>
      {loading ? (
        <ActivityIndicator size="small" color={colorIndicator} />
      ) : (
        <Text color={color} font="medium" fontSize={17} style={styleText}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};
