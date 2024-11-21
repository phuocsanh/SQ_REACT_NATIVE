import {
  BackgroundRegister,
  OTPInput,
  OTPInputHandle,
  Pressable,
  RegulationsAndTerms,
  Text,
  ViewShadowImage,
} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import {PasswordAuthScreenProps} from 'navigation/type';
import React, {useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {COLORS} from 'theme';

const PasswordAuthScreen = ({route}: PasswordAuthScreenProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const [showRrePassword, setShowRePassword] = useState(false);
  const [passError, setPassError] = useState('');
  const [rePassError, setRePassError] = useState('');
  const repassInput = useRef<OTPInputHandle>(null);

  const onSubmit = () => {
    if (!password) {
      return setPassError('Mật khẩu không được để trống!');
    }
    if (!rePassword) {
      return setRePassError('Xác nhận mật khẩu không được để trống!');
    }
    if (password !== rePassword) {
      return setRePassword('Xác nhận mật khẩu không giống mật khẩu!');
    }
    navigationRoot.navigate('ChooseCarScreen', {
      phone: route?.params?.phone,
      password: rePassword,
    });
  };

  const passOnFilled = (code: string) => {
    setPassword(code);
    setPassError('');
    if (code === rePassword) {
      setRePassError('');
      Keyboard.dismiss();
    } else if (rePassword) {
      setRePassError('Xác nhận mật khẩu không giống mật khẩu!');
    } else {
      repassInput.current?.focus();
    }
  };

  const rePassOnFilled = (code: string) => {
    setRePassword(code);
    if (code === password) {
      setRePassError('');
    } else {
      setRePassError('Xác nhận mật khẩu không giống mật khẩu!');
    }
    Keyboard.dismiss();
  };

  return (
    <BackgroundRegister canGoBack>
      <ViewShadowImage
        containerProps={{
          paddingHorizontal: 15,
          paddingTop: 18,
        }}
        showImg>
        <Text color={COLORS.primary} fontSize={16} font={'semiBold'}>
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
          autoFocusOnLoad={true}
          onCodeFilled={passOnFilled}
          onCodeDelete={() => setPassword('')}
          show={showPassword}
          errorMessage={passError}
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
        <Text marginBottom={10} color={COLORS.primary} fontSize={16} font={'semiBold'}>
          {'Xác nhận mật khẩu'}
        </Text>
        <OTPInput
          ref={repassInput}
          autoFocusOnLoad={false}
          onCodeFilled={rePassOnFilled}
          onCodeDelete={() => setRePassword('')}
          errorMessage={rePassError}
          show={showRrePassword}
        />
        <Pressable
          marginBottom={20}
          marginTop={6}
          onPress={() => {
            setShowRePassword(!showRrePassword);
          }}>
          <Text color={COLORS.raisinBlack} fontSize={15} font={'regular'}>
            {'Hiển thị mật khẩu'}
          </Text>
        </Pressable>
        <RegulationsAndTerms marginTop={56} />

        <Pressable
          marginTop={10}
          justifyContent={'center'}
          alignItems={'center'}
          height={45}
          radius={5}
          backgroundColor={COLORS.vividSkyBlue}
          onPress={onSubmit}>
          <Text fontSize={15} font={'medium'} color={COLORS.white}>
            {'Tiếp tục'}
          </Text>
        </Pressable>
      </ViewShadowImage>
    </BackgroundRegister>
  );
};

export default PasswordAuthScreen;
