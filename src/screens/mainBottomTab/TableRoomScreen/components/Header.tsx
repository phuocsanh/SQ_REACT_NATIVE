import {ICONS} from 'assets';
import {Block, Icon, Image, Pressable, StatusBar, Text} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import {HEADER_TOP_OFFSET} from 'theme';

export const Header = () => {
  const {top} = useSafeAreaInsets();
  const [zone, setZone] = useState(0);
  return (
    <Block
      backgroundColor={COLORS.primary}
      style={{
        paddingTop: top > 35 ? 35 + HEADER_TOP_OFFSET : top + HEADER_TOP_OFFSET,
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

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{marginBottom: 15, marginTop: 15}}>
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
      </Block>
    </Block>
  );
};
