import {ICONS} from 'assets';
import {Block, Icon, Image, Pressable, StatusBar, Text} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import {HEADER_TOP_OFFSET} from 'theme';

const itemHeader = [
  {
    title: 'Tất cả',
    icon: ICONS.ic_all_home,
    value: 'all',
    iconFocus: ICONS.ic_all_home_focus,
  },
  {
    title: 'Tại bàn',
    icon: ICONS.ic_in_table_home,
    value: 'inTable',
    iconFocus: ICONS.ic_in_table_home_focus,
  },
  {
    title: 'Mang về',
    icon: ICONS.ic_take_awake_home,
    value: 'takeAwake',
    iconFocus: ICONS.ic_take_awake_home_focus,
  },
  {
    title: 'Giao đi',
    icon: ICONS.ic_delivery_home,
    value: 'delivery',
    iconFocus: ICONS.ic_delivery_home_focus,
  },
];
export const Header = () => {
  const {top} = useSafeAreaInsets();
  const [valueHeader, setValueHeader] = useState('all');
  const [zone, setZone] = useState(0);
  return (
    <Block
      backgroundColor={COLORS.primary}
      style={{
        paddingTop: top + HEADER_TOP_OFFSET,
      }}>
      <StatusBar />
      <Block paddingHorizontal={15}>
        <Block rowCenter justifyContent="space-between">
          <Image source={ICONS.ic_ims} width={89} height={35} />

          <Block rowCenter>
            <Pressable
              onPress={() => navigationRoot.navigate('NotificationScreen')}
              marginRight={10}
              justifyContent="center"
              alignItems="center"
              backgroundColor={COLORS.newCar}
              round={40}>
              <Icon
                type="FontAwesome"
                name="bell"
                size={20}
                color={COLORS.white}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                navigationRoot.navigate('AddMenuInTableScreen');
              }}
              justifyContent="center"
              alignItems="center"
              backgroundColor={COLORS.newCar}
              round={40}>
              <Icon
                type="Octicons"
                name="plus"
                size={25}
                color={COLORS.white}
              />
            </Pressable>
          </Block>
        </Block>

        <Block
          backgroundColor={COLORS.white}
          radius={15}
          marginTop={12}
          marginBottom={12}
          justifyContent="space-between"
          rowCenter
          paddingHorizontal={15}
          paddingVertical={20}>
          {itemHeader.map((item, idx) => (
            <Pressable
              onPress={() => {
                setValueHeader(item.value);
              }}
              justifyContent="center"
              alignItems="center"
              key={idx}>
              <Image
                source={valueHeader === item.value ? item.iconFocus : item.icon}
                square={65}
              />
              <Text
                font={valueHeader === item.value ? 'medium' : 'regular'}
                marginTop={11}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </Block>
        {valueHeader === 'inTable' && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{marginBottom: 12}}>
            <Block rowCenter>
              {Array.from({length: 6}).map((item, idx) => (
                <Pressable
                  backgroundColor={
                    zone === idx ? COLORS.pictonBlue : COLORS.denim
                  }
                  radius={5}
                  marginRight={10}
                  paddingHorizontal={21}
                  paddingVertical={9}
                  key={idx}
                  onPress={() => {
                    setZone(idx);
                  }}>
                  <Text fontSize={16} color={COLORS.white}>
                    Khu vực {idx + 1}
                  </Text>
                </Pressable>
              ))}
            </Block>
          </ScrollView>
        )}
      </Block>
    </Block>
  );
};
