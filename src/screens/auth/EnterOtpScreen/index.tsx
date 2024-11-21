import {BackgroundRegister, Loading, OTPInput, Pressable, Text, ViewShadowImage} from 'components';
import {useCountdown} from 'hooks';
import {DataOtp} from 'models/register';
import {navigationRoot} from 'navigation/navigationRef';
import {EnterOtpScreenProps} from 'navigation/type';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useSendOtp, useVerifyOtp} from 'redux/auth/apiHooks';
import {SKIP_TOKEN} from 'redux/constant';
import {COLORS} from 'theme';

const EnterOtpScreen = ({route}: EnterOtpScreenProps) => {
  const {remainTime, resetCountdown} = useCountdown(30);
  const {isLoading: loadingSendOtp, refresh, data} = useSendOtp(route.params.phone);
  const {isLoading: loadingVerifyOtp, request: requestVerifyOtp} = useVerifyOtp();

  const reOtp = () => {
    refresh();
    resetCountdown();
  };

  const onVerifyOtp = (e: string) => {
    if (data) {
      requestVerifyOtp({
        SMSID: data.SMSID || '',
        otp: e,
      })
        .then(() => {
          navigationRoot.navigate('PasswordAuthScreen', {
            phone: route.params.phone,
          });
        })
        .catch(err => {
          Toast.show({
            type: 'toastCustom',
            text1: 'Có lỗi xảy ra!',
            text2: err?.message || 'Hệ thống đang bận. Vui lòng thử lại sau!',
            props: {type: 'error'},
          });
        });
    } else {
      Toast.show({
        type: 'toastCustom',
        text1: 'Có lỗi xảy ra!',
        text2: 'Hệ thống SMS đang bận. Vui lòng thử lại sau!',
        props: {type: 'error'},
      });
    }
  };

  return (
    <BackgroundRegister>
      <ViewShadowImage
        containerProps={{
          paddingHorizontal: 15,
          paddingTop: 18,
        }}
        showImg>
        {(loadingSendOtp || loadingVerifyOtp) && <Loading />}
        <Text marginBottom={20} color={COLORS.primary} fontSize={16} font={'semiBold'}>
          {`Nhập OTP ${data?.otp || ''}`}
        </Text>
        <OTPInput clearCodeOnFullFilled onCodeFilled={onVerifyOtp} />
        <Text
          marginTop={15}
          color={COLORS.raisinBlack}
          lineHeight={22}
          fontSize={16}
          font={'regular'}>
          {'Mã xác thực có hiệu lực 5 phút đã được gửi đến tin nhắn hoặc Zalo '}
          <Text lineHeight={22} color={COLORS.vividCerulean} fontSize={16} font={'bold'}>
            {route.params.phone}
          </Text>
          {'. Vui lòng kiểm tra tin nhắn và nhập mã xác thực.'}
        </Text>
        <Pressable
          marginTop={100}
          marginBottom={15}
          disabled={!!remainTime}
          alignSelf={'center'}
          height={40}
          justifyContent={'center'}
          paddingHorizontal={20}
          onPress={reOtp}>
          {remainTime ? (
            <Text fontSize={14} font={'regular'} color={COLORS.backgroundIcon}>
              {'Gửi lại mã'}
              {` (${remainTime})`}
            </Text>
          ) : (
            <Text fontSize={14} font={'regular'} color={COLORS.raisinBlack}>
              {'Gửi lại mã mới'}
            </Text>
          )}
        </Pressable>
      </ViewShadowImage>
    </BackgroundRegister>
  );
};

export default EnterOtpScreen;
