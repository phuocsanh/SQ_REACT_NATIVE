import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Block, Modal, Text} from 'components';
import {COLORS, mhs, width} from 'theme';
import {getDeviceIp} from 'util/helper';

/**
 * @deprecated
 * - sử dụng ModalInternetOffline
 * - sẽ xóa component này trong tương lai
 */
export const NetWork = () => {
  const [isConnection, setIsConnection] = useState<null | boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnection(state.isConnected);
      // dispatch(setIsInternet(state.isConnected));

      if (state.isConnected && state.isInternetReachable) {
        getDeviceIp().then((ip: string | null) => {
          // dispatch(setDeviceIp(ip));
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnection) {
    return null;
  }

  return (
    <Modal isVisible={true} position="center">
      <Block
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        paddingVertical={20}
        radius={10}
        paddingHorizontal={20}
        backgroundColor={COLORS.white}
        width={mhs(width - 24)}>
        <Text font="bold" textAlign="center" fontSize={20}>
          Kiểm tra kết nối mạng!
        </Text>
        <Text marginTop={10} textAlign="center" fontSize={16}>
          Vui lòng bật wifi hoặc mạng di động để tiếp tục sử dụng!
        </Text>
      </Block>
    </Modal>
  );
};
