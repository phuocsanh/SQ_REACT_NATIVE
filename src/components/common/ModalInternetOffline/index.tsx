import {useNetInfo} from '@react-native-community/netinfo';
import {IMAGES} from 'assets';
import {Block, Image, Text} from 'components';
import {Timeout} from 'models';
import React, {useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch} from 'redux/hooks';
// import {setDeviceIp} from 'redux/other/slice';
import {COLORS} from 'theme';
import {getDeviceIp} from 'util/helper';

export const ModalInternetOffline = () => {
  const {top} = useSafeAreaInsets();
  const {isInternetReachable} = useNetInfo();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const timeout = useRef<Timeout>();

  useEffect(() => {
    if (isInternetReachable) {
      getDeviceIp().then(ip => {
        // dispatch(setDeviceIp(ip));
      });
      setShow(false);
    } else {
      timeout.current = setTimeout(
        () => {
          setShow(true);
        },
        isInternetReachable === false ? 2000 : 5000,
      );
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [isInternetReachable, dispatch]);

  return show ? (
    <Block
      absoluteFillObject
      backgroundColor={COLORS.white}
      alignItems={'center'}
      zIndex={20}>
      <Image
        marginTop={top + 30}
        source={IMAGES.img_no_internet}
        width={387}
        height={480}
      />
      <Block marginTop={25} alignItems={'center'}>
        <Text fontSize={20} font={'medium'} color={COLORS.primary}>
          {'Không thể kết nối'}
        </Text>
        <Text
          marginTop={10}
          font={'regular'}
          fontSize={14}
          color={COLORS.backgroundIcon}>
          {'Không thể kết nối đến máy chủ hoặc cơ sở dữ liệu.'}
        </Text>
      </Block>
    </Block>
  ) : null;
};
