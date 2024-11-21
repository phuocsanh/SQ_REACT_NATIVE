import React from 'react';
import {
  BackgroundRegister,
  Block,
  FormInput,
  Pressable,
  Text,
  ViewShadowImage,
} from 'components';
import formConfig, {TypeRegisterEmail} from './formConfig';
import {useForm} from 'react-hook-form';
import {COLORS} from 'theme';

const RegisterScreen = () => {
  const {control, handleSubmit, setValue, watch} =
    useForm<TypeRegisterEmail>(formConfig);
  return (
    <Block flex>
      <BackgroundRegister>
        <ViewShadowImage
          containerProps={{
            paddingHorizontal: 15,
            paddingTop: 18,
          }}
          showImg>
          <Block marginBottom={40}>
            <FormInput
              maxLength={10}
              name={'email'}
              placeholder={'Nhập email'}
              control={control}
            />
            <Pressable
              radius={5}
              height={40}
              contentCenter
              marginTop={50}
              backgroundColor={COLORS.primary}>
              <Text color={COLORS.white}>Đăng ký</Text>
            </Pressable>
          </Block>
        </ViewShadowImage>
      </BackgroundRegister>
    </Block>
  );
};

export default RegisterScreen;
