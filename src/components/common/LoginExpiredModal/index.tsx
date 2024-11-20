import React from 'react';
import {Block, Button, Modal, Text} from 'components';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {COLORS} from 'theme';

import {navigationRoot} from 'navigation/navigationRef';
import {expiredToken} from 'redux/auth/slice';

export const LoginExpiredModal = () => {
  const isExpiredToken = useAppSelector(state => state.auth.isExpiredToken);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    dispatch(expiredToken(false));
    // navigationRoot.navigate('CheckPhoneLoginScreen');
  };
  return (
    <Modal isVisible={isExpiredToken} position="center">
      <Block
        alignItems="center"
        justifyContent="space-between"
        height={200}
        radius={18}
        margin={30}
        padding={30}
        backgroundColor={COLORS.white}>
        <Text
          font="medium"
          textAlign="center"
          fontSize={18}
          marginBottom={10}
          color={COLORS.primary}>
          Phiên đăng nhập đã hết hạn
        </Text>
        <Text
          fontSize={16}
          textAlign="center"
          marginBottom={15}
          color={COLORS.antiFlashWhite}>
          Vui lòng đăng nhập lại!
        </Text>
        <Button
          style={{width: '90%'}}
          title="Xác nhận"
          onPress={handleSubmit}
        />
      </Block>
    </Modal>
  );
};
