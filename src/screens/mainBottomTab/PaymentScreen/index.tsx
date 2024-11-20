import {ScrollView} from 'react-native';
import React from 'react';
import {Block, Image, Pressable, Text} from 'components';
import {COLORS, width} from 'theme';
import {Header} from './Components/Header';
import {ICONS} from 'assets';
import {navigationRoot} from 'navigation/navigationRef';
const data = [1, 2, 3, 4, 5, 6, 7, 8];
const PaymentScreen = () => {
  return (
    <Block flex backgroundColor={COLORS.ghostWhite}>
      <Header />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 12,
          paddingBottom: 150,
        }}>
        {data.map((item, index) => {
          return (
            <Block
              key={index}
              paddingHorizontal={15}
              radius={15}
              marginBottom={12}
              paddingVertical={12}
              backgroundColor={COLORS.white}>
              <Image
                position="absolute"
                top={12}
                left={-2}
                source={ICONS.ic_temTable}
                height={21}
                width={48}
                resizeMode="contain"
              />
              <Text
                marginBottom={12}
                marginLeft={43}
                fontSize={16}
                font="medium"
                color={COLORS.primary}>
                Bàn 4 - Khu vực 1
              </Text>
              <Block marginBottom={8} rowCenter>
                <Image
                  source={ICONS.ic_priceTable}
                  square={28}
                  marginRight={14}
                  resizeMode="contain"
                />
                <Text fontSize={18} font="medium">
                  781.000đ
                </Text>
              </Block>
              <Block marginBottom={8} rowCenter>
                <Image
                  source={ICONS.ic_timeTable}
                  square={28}
                  marginRight={14}
                  resizeMode="contain"
                />
                <Text fontSize={15}>1 phút</Text>
              </Block>
              <Block marginBottom={10} rowCenter>
                <Image
                  source={ICONS.ic_teamPeople}
                  square={28}
                  marginRight={14}
                  resizeMode="contain"
                />
                <Text fontSize={15}>2 người</Text>
              </Block>
              <Block
                height={1}
                marginBottom={12}
                backgroundColor={COLORS.brightGray}
                marginHorizontal={-12}
              />
              <Block rowCenter justifyContent="space-between">
                <Block
                  alignItems="center"
                  borderWidth={1}
                  backgroundColor={COLORS.white}
                  radius={10}
                  width={'48%'}
                  paddingVertical={15}
                  borderColor={COLORS.primary}>
                  <Text fontSize={17} font="medium" color={COLORS.primary}>
                    Hoãn thanh toán
                  </Text>
                </Block>
                <Pressable
                  onPress={() => navigationRoot.navigate('PaymentScreen')}
                  alignItems="center"
                  borderWidth={1}
                  backgroundColor={COLORS.primary}
                  radius={10}
                  width={(width - 30) / 2.2}
                  paddingVertical={15}
                  borderColor={COLORS.primary}>
                  <Text fontSize={17} font="medium" color={COLORS.white}>
                    Thanh toán
                  </Text>
                </Pressable>
              </Block>
            </Block>
          );
        })}
      </ScrollView>
    </Block>
  );
};

export default PaymentScreen;
