import React from 'react';
import {Block, Image, Pressable, ScrollView, StatusBar, Text} from 'components';
import {COLORS_GRADIENT, COLORS} from 'theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HEADER_TOP_OFFSET} from 'theme';
import LinearGradient from 'react-native-linear-gradient';
import {ICONS} from 'assets';
import {navigationRoot} from 'navigation/navigationRef';

const DATA_PROFILE = [
  {
    title: 'Thiết lập tài khoản',
    right: 1,
    icon: ICONS.ic_settingProfile,
    onPress: () => navigationRoot.navigate('SettingProfileScreen'),
  },
  {
    title: 'Ngôn ngữ',
    icon: ICONS.ic_language,
    right: 1,
    onPress: () => navigationRoot.navigate('LanguageScreen'),
  },
  {
    title: 'Thiết lập máy in',
    right: 1,
    icon: ICONS.ic_print,
    onPress: () => navigationRoot.navigate('PrintScreen'),
  },
  {
    title: 'Hiển thị bàn',
    right: 1,
    icon: ICONS.ic_showTable,
    onPress: () => navigationRoot.navigate('ShowTableScreen'),
  },
  {
    right: 1,
    title: 'Cài đặt bán hàng',
    icon: ICONS.ic_settingBuy,
    onPress: () => navigationRoot.navigate('SettingBuyScreen'),
  },
  {
    right: 1,
    title: 'Cài đặt thông báo',
    icon: ICONS.ic_settingNotification,
    onPress: () => navigationRoot.navigate('SettingNotificationScreen'),
  },
  {
    title: 'Đổi mật khẩu',
    right: 1,
    icon: ICONS.ic_changePass,
    onPress: () => navigationRoot.navigate('ChangePasswordScreen'),
  },
  {
    title: 'Đồng bộ dữ liệu',
    icon: ICONS.ic_sync,
    right: 0,
  },
  {
    title: 'Hướng dẫn sử dụng',
    icon: ICONS.ic_instruct,
    right: 1,
  },
  {
    title: 'Điều khoản',
    right: 1,
    icon: ICONS.ic_clause,
  },
  {
    title: 'Hỗ trợ',
    right: 0,
    icon: ICONS.ic_support,
  },
  {
    title: 'Đăng xuất',
    icon: ICONS.ic_logout,
  },
];

const ProfileScreen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <Block flex>
      <LinearGradient
        colors={COLORS_GRADIENT.headerProfile}
        style={{
          borderBottomLeftRadius: 45,
          paddingTop: top + HEADER_TOP_OFFSET,
          paddingHorizontal: 15,
          paddingBottom: 15,
        }}>
        <StatusBar />
        <Block marginBottom={15} rowCenter justifyContent="space-between">
          <Block>
            <Text fontSize={22} font="medium" color={COLORS.white}>
              Leng Keng
            </Text>
            <Text marginTop={5} fontSize={15} color={COLORS.white}>
              Mã nhà hàng: 41743
            </Text>
          </Block>
          <Pressable
            onPress={() => {
              navigationRoot.navigate('NotificationScreen');
            }}>
            <Image source={ICONS.ic_notification} square={43} />
          </Pressable>
        </Block>
        <Block rowCenter>
          <Image
            height={72}
            marginRight={15}
            width={86}
            resizeMode="cover"
            borderTopLeftRadius={32}
            borderTopRightRadius={32}
            borderBottomLeftRadius={32}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2023/09/04/03/24/ai-generated-8231889_1280.png',
            }}
          />
          <Block width={'75%'}>
            <Text
              fontSize={18}
              numberOfLines={1}
              font="medium"
              color={COLORS.white}>
              Trần Nguyễn Hoài Phong
            </Text>
            <Text
              numberOfLines={1}
              fontSize={15}
              color={COLORS.white}
              marginTop={6}>
              Nhân viên phục vụ
            </Text>
          </Block>
        </Block>
      </LinearGradient>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150,
          paddingTop: 15,
        }}>
        <Block
          radius={15}
          backgroundColor={COLORS.white}
          marginHorizontal={15}
          paddingHorizontal={15}>
          {DATA_PROFILE.map((item, index) => {
            return (
              <Pressable
                onPress={item.onPress}
                marginTop={5}
                height={60}
                rowCenter
                key={index}>
                <Image source={item.icon} square={50} marginRight={15} />
                <Block
                  height={60}
                  borderBottomWidth={index + 1 === DATA_PROFILE.length ? 0 : 1}
                  borderColor={COLORS.brightGray}
                  rowCenter
                  justifyContent="space-between"
                  flex>
                  <Text fontSize={17} font="regular">
                    {item.title}{' '}
                    {item.title === 'Hỗ trợ' && (
                      <Text fontSize={17} color={COLORS.primary}>
                        1900 9999
                      </Text>
                    )}
                  </Text>
                  {item.right === 1 && (
                    <Image
                      source={ICONS.ic_arrowRight}
                      square={10}
                      resizeMode="contain"
                    />
                  )}
                </Block>
              </Pressable>
            );
          })}
        </Block>
      </ScrollView>
    </Block>
  );
};

export default ProfileScreen;
