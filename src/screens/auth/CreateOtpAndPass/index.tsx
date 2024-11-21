import {BackgroundRegister, Loading, OTPInput, Pressable, Text, ViewShadowImage} from 'components';
import {useCountdown} from 'hooks';
import {DataOtp} from 'models/register';
import {CreateOtpAndPassProps} from 'navigation/type';
import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';
import {useResetPassword, useSendOtp, useVerifyOtp} from 'redux/auth/apiHooks';
import {COLORS} from 'theme';

const CreateOtpAndPass = ({route}: CreateOtpAndPassProps) => {
  const {remainTime, resetCountdown} = useCountdown(90);
  const {isLoading: loadingSendOtp, refresh, data} = useSendOtp(route.params.phone);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const {isLoading: isLoadingResetPassword, request: requestResetPassword} = useResetPassword();
  const {isLoading: loadingVerifyOtp, request: requestVerifyOtp} = useVerifyOtp();

  const reOtp = () => {
    resetCountdown();
    refresh();
  };

  const handleSave = () => {
    requestVerifyOtp({
      SMSID: data?.SMSID || '',
      otp: otp,
    })
      .then(() => {
        requestResetPassword({phone: route.params.phone, password}).then(() => {
          Toast.show({
            type: 'toastCustom',
            text1: 'Cập nhật thành công',
            props: {type: 'success'},
          });
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
  };

  const otpOnFilled = (code: string) => {
    setOtp(code);
    Keyboard.dismiss();
  };

  const passOnFilled = (code: string) => {
    setPassword(code);
    Keyboard.dismiss();
  };

  return (
    <BackgroundRegister>
      <ViewShadowImage
        containerProps={{
          paddingHorizontal: 15,
          paddingTop: 18,
        }}
        showImg>
        {(loadingSendOtp || isLoadingResetPassword || loadingVerifyOtp) && <Loading />}
        <Text marginBottom={15} color={COLORS.primary} fontSize={16} font={'semiBold'}>
          {`Nhập OTP ${data?.otp || ''}`}
        </Text>
        <Text
          marginBottom={15}
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
        <OTPInput
          autoFocusOnLoad={true}
          onCodeFilled={otpOnFilled}
          onCodeDelete={() => setOtp('')}
        />
        <Text marginTop={15} color={COLORS.primary} fontSize={16} font={'semiBold'}>
          {'Tạo mật khẩu'}
        </Text>
        <Text
          marginTop={5}
          marginBottom={10}
          color={COLORS.raisinBlack}
          fontSize={16}
          font={'regular'}>
          {'Vì lý do bảo mật, vui lòng tạo mật khẩu'}
        </Text>
        <OTPInput
          autoFocusOnLoad={false}
          onCodeFilled={passOnFilled}
          onCodeDelete={() => setPassword('')}
          show={showPassword}
        />
        <Pressable
          marginBottom={20}
          marginTop={6}
          onPress={() => {
            setShowPassword(!showPassword);
          }}>
          <Text color={COLORS.raisinBlack} fontSize={15} font={'regular'}>
            {'Hiển thị mật khẩu'}
          </Text>
        </Pressable>

        <Pressable
          marginTop={60}
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
        <Pressable
          disabled={otp?.length === 6 && password?.length === 6 ? false : true}
          marginTop={8}
          marginVertical={15}
          justifyContent={'center'}
          alignItems={'center'}
          height={45}
          radius={5}
          backgroundColor={
            otp?.length === 6 && password?.length === 6 ? COLORS.vividSkyBlue : COLORS.darkSilver
          }
          onPress={() => {
            handleSave();
          }}>
          <Text fontSize={15} font={'medium'} color={COLORS.white}>
            {'Cập nhật'}
          </Text>
        </Pressable>
      </ViewShadowImage>
    </BackgroundRegister>
  );
};

export default CreateOtpAndPass;
