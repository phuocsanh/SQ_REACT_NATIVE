import {Block, Icon, Text} from 'components';
import React from 'react';
import {COLORS} from 'theme';

type BlockErrorRegisterProps = {
  data?: string;
};
export const BlockErrorRegister = ({data = ''}: BlockErrorRegisterProps) => {
  return (
    <Block padding={12} marginBottom={20} row radius={5} backgroundColor={COLORS.seashellPink}>
      <Icon type={'MaterialIcons'} name={'cancel'} color={COLORS.electricRed} />
      <Block flex paddingLeft={10}>
        <Text marginBottom={10} color={COLORS.electricRed} fontSize={15} font={'semiBold'}>
          {'Cập nhật thông tin đăng ký'}
        </Text>
        <Text color={COLORS.raisinBlack} fontSize={14} font={'regular'}>
          {data}
        </Text>
      </Block>
    </Block>
  );
};
