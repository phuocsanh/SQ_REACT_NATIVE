import {ICONS} from 'assets';
import {Block, Icon, Image, Pressable, Text} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'theme';

const ItemOrder = () => {
  return (
    <Pressable
      onPress={() => navigationRoot.navigate('InvoiceDetailAtTableScreen')}
      backgroundColor={COLORS.white}
      radius={15}
      marginBottom={12}
      width={'48%'}>
      <Block rowCenter marginTop={12}>
        <View style={styles.container}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangleLeft}>
              <Image
                alignSelf="flex-end"
                source={ICONS.ic_in_table_item}
                square={18}
                resizeMode="contain"
              />
            </View>
            <View style={styles.triangleRight} />
          </View>
        </View>
        <Text marginLeft={10} fontSize={16} font="medium">
          Bàn 1
        </Text>
      </Block>
      <Block marginTop={12} marginLeft={15} marginBottom={10}>
        <Block rowCenter>
          <Block
            backgroundColor={COLORS.ghostWhite}
            round={26}
            justifyContent="center"
            alignItems="center">
            <Image source={ICONS.ic_money} square={13} />
          </Block>
          <Text marginLeft={14} font="medium">
            210.000đ
          </Text>
        </Block>
        <Block marginTop={8} rowCenter>
          <Block
            backgroundColor={COLORS.ghostWhite}
            round={26}
            justifyContent="center"
            alignItems="center">
            <Icon type="Ionicons" size={15} name="hourglass-outline" />
          </Block>
          <Text marginLeft={14}>1 Phút</Text>
        </Block>
        <Block marginTop={8} rowCenter>
          <Block
            backgroundColor={COLORS.ghostWhite}
            round={26}
            justifyContent="center"
            alignItems="center">
            <Icon type="FontAwesome6" size={13} name="users" />
          </Block>
          <Text marginLeft={14}>2 Người</Text>
        </Block>
      </Block>
      <Block height={1} backgroundColor={COLORS.brightGray} />
      <Block paddingLeft={15} rowCenter paddingVertical={10}>
        <Block radius={8} square={8} marginRight={10} backgroundColor={'red'} />
        <Text fontSize={14} flex>
          Đã chuyển đến bếp
        </Text>
      </Block>
    </Pressable>
  );
};

export default ItemOrder;

const styles = StyleSheet.create({
  container: {
    marginLeft: -3,
  },
  rectangleContainer: {
    flexDirection: 'row',
  },
  rectangleLeft: {
    width: 36, // Chiều rộng hình chữ nhật bên trái (giảm đi để chừa chỗ cho tam giác)
    height: 21,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  triangleRight: {
    borderTopWidth: 10.5, // Chiều cao tam giác bằng với chiều cao của hình chữ nhật
    borderTopColor: 'transparent',
    borderLeftWidth: 10.5, // Chiều rộng tam giác (để tạo ra góc nhọn)
    borderLeftColor: 'blue',
    borderBottomWidth: 10.5, // Chiều cao tam giác
    borderBottomColor: 'transparent',
  },
});
