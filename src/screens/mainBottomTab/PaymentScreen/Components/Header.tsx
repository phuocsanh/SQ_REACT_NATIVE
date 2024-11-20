import {ICONS} from 'assets';
import {Block, Icon, Image, Pressable, StatusBar, Text} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, rhs, width} from 'theme';
import {HEADER_TOP_OFFSET} from 'theme';

const DATA_TAB = [
  {title: 'Chờ thanh toán', id: 1},
  {title: 'Chờ xác nhận', id: 2},
];

export const Header = () => {
  const {top} = useSafeAreaInsets();
  const [tab, setTab] = useState(DATA_TAB[0]);
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
          </Block>
        </Block>
        <Block
          marginBottom={12}
          marginTop={15}
          rowCenter
          justifyContent="space-between">
          {DATA_TAB.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  setTab(item);
                }}
                width={'48%'}
                paddingVertical={10}
                alignItems="center"
                radius={8}
                key={index}
                backgroundColor={
                  item.id === tab.id ? COLORS.pictonBlue : COLORS.denim
                }>
                <Text fontSize={16} color={COLORS.white}>
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </Block>
      </Block>
    </Block>
  );
};
