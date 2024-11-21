import {
  BackgroundRegister,
  Block,
  Loading,
  OTPInput,
  Pressable,
  RegulationsAndTerms,
  Text,
  ViewShadowImage,
} from 'components';
import {useCountdown} from 'hooks';
import {navigationRoot} from 'navigation/navigationRef';
import {ForgotPasswordScreenProps} from 'navigation/type';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useSendOtp, useVerifyOtp} from 'redux/auth/apiHooks';
import {COLORS} from 'theme';

const ForgotPasswordScreen = ({route}: ForgotPasswordScreenProps) => {
  const phone = route?.params?.phone;
  const [otp, setOtp] = useState('');
  const {remainTime, resetCountdown} = useCountdown(90);
  const {isLoading: loadingSendOtp, refresh, data: dataSendOtp} = useSendOtp(phone);
  const {isLoading: loadingVerifyOtp, request: requestVerifyOtp} = useVerifyOtp();

  useEffect(() => {
    if (otp?.length === 6) {
      requestVerifyOtp({
        SMSID: dataSendOtp?.SMSID || '',
        otp,
      })
        .then(() => {
          navigationRoot.navigate('NewPasswordForgotScreen', {phone});
        })
        .catch(err => {
          Toast.show({
            type: 'toastCustom',
            text1: 'Có lỗi xảy ra!',
            text2: err?.message || 'Hệ thống đang bận. Vui lòng thử lại sau!',
            props: {type: 'error'},
          });
        });
    }
  }, [otp]);

  const handleReSendOtp = () => {
    refresh();
    resetCountdown();
  };

  return (
    <Block flex backgroundColor={COLORS.white}>
      {(loadingSendOtp || loadingVerifyOtp) && <Loading />}
      <BackgroundRegister>
        <ViewShadowImage
          containerProps={{
            paddingHorizontal: 15,
            paddingTop: 18,
          }}
          showImg>
          <Text color={COLORS.primary} fontSize={18} font={'semiBold'}>
            {dataSendOtp?.otp ? `Nhập OTP ${dataSendOtp?.otp}` : 'Nhập OTP'}
          </Text>
          <Text
            marginTop={8}
            marginBottom={23}
            color={COLORS.raisinBlack}
            lineHeight={22}
            fontSize={16}
            font={'regular'}>
            {'Mã xác thực có hiệu lực 5 phút đã được gửi đến tin nhắn hoặc Zalo '}
            <Text lineHeight={22} color={COLORS.vividCerulean} fontSize={16} font={'bold'}>
              {route?.params?.phone}
            </Text>
            {'. Vui lòng kiểm tra tin nhắn và nhập mã xác thực.'}
          </Text>
          <OTPInput onCodeFilled={setOtp} />
          <Pressable
            disabled={remainTime === 0 ? false : true}
            marginTop={10}
            onPress={handleReSendOtp}>
            <Text
              fontSize={15}
              color={remainTime === 0 ? COLORS.raisinBlack : COLORS.backgroundIcon}
              font={'regular'}>
              {remainTime === 0 ? 'Gửi lại mã' : `Gửi lại mã (${remainTime}s)`}
            </Text>
          </Pressable>
          <RegulationsAndTerms marginTop={120} />
        </ViewShadowImage>
      </BackgroundRegister>
    </Block>
  );
};

export default ForgotPasswordScreen;
