import {Block} from 'components';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS, Size} from 'theme';

export const LoadingComponent = ({
  width = 180,
  height = 50,
  backgroundColor = 'rgba(255,255,255, 0.5)',
}: {
  width?: Size;
  height?: Size;
  backgroundColor?: string;
}) => {
  return (
    <Block
      radius={5}
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      backgroundColor={backgroundColor}
      right={0}
      height={'100%'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      zIndex={9999}>
      <Block
        alignItems={'center'}
        justifyContent={'center'}
        height={height}
        width={width}
        radius={5}>
        <ActivityIndicator size="small" color={COLORS.white} />
      </Block>
    </Block>
  );
};
