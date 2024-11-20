import {Block, Modal} from 'components';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS} from 'theme';

export const Loading = () => {
  return (
    <Modal
      position="center"
      backdropOpacity={0.2}
      isVisible={true}
      containerStyle={{alignItems: 'center'}}>
      <Block
        alignItems={'center'}
        justifyContent={'center'}
        height={70}
        width={70}
        radius={5}
        backgroundColor="gray">
        <ActivityIndicator size="small" color={COLORS.white} />
      </Block>
    </Modal>
  );
};
