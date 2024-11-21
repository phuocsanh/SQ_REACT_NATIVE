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
import {navigationRoot} from 'navigation/navigationRef';
import {LoginScreenProps} from 'navigation/type';
import React from 'react';
import {Keyboard} from 'react-native';
import {useDeviceName} from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {useLoginDriver} from 'redux/auth/apiHooks';
import {COLORS} from 'theme';

const LoginScreen = ({route}: LoginScreenProps) => {
  const dataRoute = route?.params;
  const deviceName = useDeviceName().result;
  // const deviceToken = useFCMToken();
  const {isLoading: loadingUseLogin, request: requestUseLogin} =
    useLoginDriver();

  // const login = (code: string) => {
  //   Keyboard.dismiss();
  //   if (!deviceToken) {
  //     return Toast.show({
  //       type: 'toastCustom',
  //       text1: 'Có lỗi xảy ra',
  //       text2: 'Thử khởi động lại ứng dụng!',
  //       props: {type: 'error'},
  //     });
  //   }
  //   const body = {
  //     username: dataRoute,
  //     password: code,
  //     device_name: deviceName,
  //     device_token: deviceToken,
  //   };
  //   requestUseLogin(body).catch(e => {
  //     console.log(e);
  //   });
  // };

  return (
    <Block flex backgroundColor={COLORS.white}>
      {loadingUseLogin && <Loading />}
      <BackgroundRegister>
        <ViewShadowImage
          containerProps={{
            paddingHorizontal: 15,
            paddingTop: 18,
          }}
          showImg>
          <Text color={COLORS.primary} fontSize={18} font={'bold'}>
            {'Nhập mật khẩu'}
          </Text>
          <Text
            marginTop={8}
            marginBottom={23}
            color={COLORS.black}
            fontSize={16}
            font={'regular'}>
            {'Bạn đang đăng nhập bằng số điện thoại\n'}
            <Text color={COLORS.primary} fontSize={16} font={'bold'}>
              {`${dataRoute}. `}
            </Text>
            {'Vui lòng nhập mật khẩu để tiếp tục'}
          </Text>
          {/* <OTPInput show={false} onCodeFilled={login} clearCodeOnFullFilled /> */}
          <Pressable
            alignSelf={'flex-start'}
            paddingRight={20}
            marginTop={5}
            paddingVertical={10}
            onPress={() => {}}>
            <Text fontSize={15} color={COLORS.primary} font={'regular'}>
              {'Vui lòng nhấn vào '}
              <Text
                fontSize={15}
                color={COLORS.primary}
                textDecorationLine={'underline'}
                font={'medium'}>
                {'Quên mật khẩu'}
              </Text>
            </Text>
          </Pressable>
          <RegulationsAndTerms marginTop={120} />
        </ViewShadowImage>
      </BackgroundRegister>
    </Block>
  );
};

export default LoginScreen;
