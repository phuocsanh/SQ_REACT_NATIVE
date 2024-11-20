import {Block, Icon, Pressable, StatusBar, Text} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React, {PropsWithChildren, ReactElement} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, COLORS_GRADIENT} from 'theme';

export type BackgroundRegisterProps = PropsWithChildren<
  Partial<{
    canGoBack?: boolean;
    onGoBack?: () => void;
    renderRight?: () => ReactElement;
  }>
>;

export const BackgroundRegister = ({
  canGoBack = true,
  onGoBack = navigationRoot.goBack,
  children,
  renderRight,
}: BackgroundRegisterProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <Block flex backgroundColor={COLORS.white}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'} enabled={Platform.OS === 'ios'}>
        <StatusBar />
        <LinearGradient
          style={{
            paddingTop: top,
            flex: 1,
            position: 'absolute',
            zIndex: -1,
            height: '50%',
            width: '100%',
          }}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={COLORS_GRADIENT.header}
        />
        <SafeAreaView
          style={{
            marginTop: top,
            flex: 1,
          }}>
          <Block
            zIndex={9}
            height={30}
            alignSelf={'flex-start'}
            justifyContent={'center'}
            paddingHorizontal={12}>
            {canGoBack && (
              <Pressable
                width={35}
                height={35}
                onPress={onGoBack}
                justifyContent={'center'}
                alignItems={'center'}>
                <Icon type="FontAwesome6" name="angle-left" size={25} color={COLORS.white} />
              </Pressable>
            )}
          </Block>
          <Block marginTop={-35}>
            <Text textAlign={'center'} fontSize={30} font={'bold'} color={COLORS.white}>
              {'SKY'}
            </Text>
            {renderRight && renderRight()}
          </Block>

          <Text
            marginTop={13}
            textAlign={'center'}
            fontSize={16}
            font={'regular'}
            color={COLORS.white}>
            {'Bắt đầu trải nghiệm dịch vụ của Sky'}
          </Text>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingTop: 20,
              paddingBottom: 50,
            }}
            showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
              <>{children}</>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Block>
  );
};
