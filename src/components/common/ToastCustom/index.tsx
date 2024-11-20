import React from 'react';
import Toast, {ToastConfigParams} from 'react-native-toast-message';
import {Block, Icon, Image, Pressable, Text} from 'components';
import {COLORS} from 'theme';
import {ICONS} from 'assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const iconToast = {
  success: ICONS.ic_toastSuccessIcon,
  warning: ICONS.ic_toastWarningIcon,
  error: ICONS.ic_toastErrorIcon,
  info: ICONS.ic_toastInfoIcon,
};
const textColor = {
  success: '#1f8722',
  warning: '#f08135',
  error: '#d9100a',
  info: COLORS.primary,
};

export type ToastCustomProps = {
  type?: 'error' | 'success' | 'warning' | 'info';
  action?: {title: string; onPress: () => void};
};

export const ToastCustom = (params: ToastConfigParams<ToastCustomProps>) => {
  const {
    text1,
    text2,
    props: {type, action},
  } = params;
  return (
    <Block
      radius={10}
      padding={12}
      width={'95%'}
      marginHorizontal={12}
      borderWidth={1}
      borderColor={
        type === 'error'
          ? COLORS.red
          : type === 'warning'
          ? COLORS.cadmiumOrange
          : type === 'info'
          ? COLORS.primary
          : COLORS.yellowGreen
      }
      backgroundColor={COLORS.white}>
      <Block rowCenter>
        <Image square={20} resizeMode="contain" source={iconToast[type || 'info']} />
        <Block flex marginLeft={10}>
          {!!text1 ? (
            <Text font="semiBold" fontSize={15} color={COLORS.raisinBlack}>
              {text1}
            </Text>
          ) : (
            <Text font="semiBold" fontSize={15} marginTop={0} color={COLORS.raisinBlack}>
              {type === 'error'
                ? 'Có lỗi xảy ra!'
                : type === 'warning'
                ? 'Cảnh báo!'
                : type === 'info'
                ? 'Thông báo!'
                : 'Thành công!'}
            </Text>
          )}
        </Block>
        <Pressable
          square={30}
          justifyContent="center"
          alignItems="center"
          onPress={() => Toast.hide()}>
          <Icon type="Ionicons" name="close" color={COLORS.backgroundIcon} />
        </Pressable>
      </Block>
      {!!text2 && (
        <Text marginLeft={32} font="regular" fontSize={14} marginTop={0} color={COLORS.raisinBlack}>
          {text2}
        </Text>
      )}
      {action && (
        <Pressable
          marginLeft={32}
          marginTop={12}
          onPress={() => {
            Toast.hide();
            action.onPress();
          }}>
          <Text fontSize={14} font="black" color={textColor[type || 'info']}>
            {action.title || ''}
          </Text>
        </Pressable>
      )}
    </Block>
  );
};

export const RenderToast = () => {
  const {top} = useSafeAreaInsets();
  return <Toast topOffset={top} visibilityTime={3000} config={{toastCustom: ToastCustom}} />;
};
