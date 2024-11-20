import {Block, Text} from 'components';
import React from 'react';
import {COLORS} from 'theme';

export type TextInputWatchProps = Partial<{
  title: string;
  value: string;
}>;

export const TextInputWatch = ({title = '', value = ''}: TextInputWatchProps) => {
  return (
    <Block marginTop={15}>
      <Text numberOfLines={1} color={COLORS.raisinBlack} font={'semiBold'} fontSize={16}>
        {title}
      </Text>
      <Block
        marginTop={10}
        height={45}
        radius={5}
        justifyContent={'center'}
        backgroundColor={COLORS.antiFlashWhite}
        paddingHorizontal={10}>
        <Text numberOfLines={1} color={COLORS.raisinBlack} font={'regular'} fontSize={14}>
          {value}
        </Text>
      </Block>
    </Block>
  );
};
