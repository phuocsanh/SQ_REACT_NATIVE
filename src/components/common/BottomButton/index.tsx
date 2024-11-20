import {Block, Pressable, Text} from 'components';
import {ActivityIndicator, StyleSheet, Platform} from 'react-native';
import {COLORS, Size, hs} from 'theme';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type BottomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  topContent?: () => React.ReactElement;
  leftContent?: () => React.ReactElement;
  width?: Size;
  loading?: boolean;
  radius?: number;
  bgColor?: string;
  backgroundColor?: string;
  colorTitle?: string;
  paddingHorizontal?: number;
};

export function BottomButton({
  title = '',
  onPress,
  disabled,
  topContent,
  leftContent,
  width = '100%',
  loading = false,
  radius = 5,
  bgColor = COLORS.white,
  backgroundColor = COLORS.primary,
  colorTitle = COLORS.white,
  paddingHorizontal = 12,
}: BottomButtonProps) {
  const {bottom} = useSafeAreaInsets();

  return (
    <Block
      style={styles.shadowContainer}
      position="absolute"
      bottom={0}
      flex
      width={width}
      alignSelf="center"
      row={leftContent ? true : false}
      paddingHorizontal={paddingHorizontal}
      paddingTop={10}
      paddingBottom={bottom === 0 ? 15 : bottom}
      backgroundColor={bgColor}>
      {topContent && topContent?.()}
      {leftContent && leftContent?.()}
      <Pressable
        flex
        justifyContent="center"
        alignItems="center"
        height={45}
        radius={radius}
        onPress={onPress}
        backgroundColor={backgroundColor}
        disabled={loading || disabled}>
        {loading ? (
          <ActivityIndicator size={hs(30)} color="white" />
        ) : (
          <Text font="medium" fontSize={15} color={disabled ? COLORS.antiFlashWhite : colorTitle}>
            {title}
          </Text>
        )}
      </Pressable>
    </Block>
  );
}
const styles = StyleSheet.create({
  shadowContainer: {
    ...Platform.select({
      ios: {
        shadowColor: '#80c0d9',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.8,
        shadowRadius: 10.0,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});
