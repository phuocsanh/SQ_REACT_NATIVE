import {Pressable, PressableProps, Text} from 'components';
import {COLORS} from 'theme';
import React, {useEffect} from 'react';
import {useCountdown} from 'hooks';
import {ActivityIndicator, ColorValue} from 'react-native';

type ButtonCountDownProps = {
  loading?: boolean;
  time: number;
  title: string;
  color?: ColorValue;
  onTimeOut: () => void;
} & PressableProps;

export const ButtonCountDown = ({
  loading,
  time,
  title,
  backgroundColor = COLORS.primary,
  color = COLORS.white,
  height = 45,
  contentCenter = true,
  onTimeOut,
  radius = 5,
  ...props
}: ButtonCountDownProps) => {
  const {remainTime} = useCountdown(time);

  useEffect(() => {
    if (remainTime === 0) {
      onTimeOut();
    }
  }, [remainTime]);

  return (
    <Pressable
      backgroundColor={backgroundColor}
      height={height}
      contentCenter={contentCenter}
      radius={radius}
      {...props}>
      {loading ? (
        <ActivityIndicator color={COLORS.white} size={30} />
      ) : (
        <Text fontSize={17} color={color}>
          {title}
          {` (${remainTime})`}
        </Text>
      )}
    </Pressable>
  );
};
