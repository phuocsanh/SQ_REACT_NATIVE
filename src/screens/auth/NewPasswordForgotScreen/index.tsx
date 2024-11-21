import {
  BackgroundRegister,
  Loading,
  OTPInput,
  Pressable,
  RegulationsAndTerms,
  Text,
  ViewShadowImage,
} from 'components';
import {NewPasswordForgotScreenProps} from 'navigation/type';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useResetPassword} from 'redux/auth/apiHooks';
import {COLORS} from 'theme';

const NewPasswordForgotScreen = ({route}: NewPasswordForgotScreenProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {isLoading: isLoadingResetPassword, request: requestResetPassword} = useResetPassword();

  const handleContinue = () => {
    if (password?.length === 6) {
      requestResetPassword({phone: route.params.phone, password});
    } else {
      Toast.show({
        type: 'toastCustom',
        text1: 'Có lỗi xảy ra',
        text2: 'Mật khẩu không hợp lệ',
        props: {type: 'error'},
      });
    }
  };

  return (
    <BackgroundRegister canGoBack>
      {isLoadingResetPassword && <Loading />}
      <ViewShadowImage
        containerProps={{
          paddingHorizontal: 15,
          paddingTop: 18,
        }}
        showImg>
        <Text color={COLORS.primary} fontSize={18} font={'semiBold'}>
          {'Nhập mật khẩu mới'}
        </Text>
        <Text
          marginTop={8}
          marginBottom={23}
          color={COLORS.raisinBlack}
          lineHeight={24}
          fontSize={16}
          font={'regular'}>
          {'Nhập mật khẩu mới để tiếp tục hành trình khám phá và trải nghiệm Sky'}
        </Text>
        <OTPInput show={showPassword} onCodeFilled={setPassword} />
        <Pressable
          marginBottom={20}
          marginTop={6}
          onPress={() => {
            setShowPassword(!showPassword);
          }}>
          <Text color={COLORS.backgroundIcon} fontSize={14} font={'regular'}>
            {'Hiện mật khẩu'}
          </Text>
        </Pressable>
        <RegulationsAndTerms marginTop={120} />
        <Pressable
          marginTop={8}
          marginVertical={15}
          justifyContent={'center'}
          alignItems={'center'}
          height={45}
          radius={5}
          backgroundColor={COLORS.vividSkyBlue}
          onPress={handleContinue}>
          <Text fontSize={15} font={'medium'} color={COLORS.white}>
            {'Xong'}
          </Text>
        </Pressable>
      </ViewShadowImage>
    </BackgroundRegister>
  );
};

export default NewPasswordForgotScreen;
