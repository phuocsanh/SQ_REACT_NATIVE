import React, {useState} from 'react';
import {
  Block,
  Button,
  HeaderTitle,
  Modal,
  Pressable,
  ScrollView,
  Text,
} from 'components';
import {COLORS, width} from 'theme';
import {Header} from './Components/Header';
import {navigationRoot} from 'navigation/navigationRef';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const data_filter = [
  {
    title: 'Thời gian thanh toán',
    arr: ['Hôm nay', 'Hôm qua', 'Tuần này', 'Tháng này'],
  },
  {
    title: 'Trạng thái hóa đơn',
    arr: ['Đã thanh toán', 'Đã hủy', 'Hoàn tiền một phần', 'Hoàn tiền toàn bộ'],
  },
  {
    title: 'Hình thức phục vụ',
    arr: ['Ăn tại bàn', 'Mang về', 'Giao đi', 'Kênh bán hàng'],
  },
  {
    title: 'Phương thức thanh toán',
    arr: ['Tiền mặt', 'Thẻ ATM', 'Visa', 'Thẻ Master'],
  },
];
const ManagementOrderScreen = () => {
  const [modal, setModal] = useState(false);
  return (
    <Block flex backgroundColor={COLORS.ghostWhite}>
      <Header setModal={setModal} modal={modal} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 100,
          paddingTop: 15,
        }}>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                navigationRoot.navigate('DetailPaymentScreen');
              }}
              padding={12}
              key={index}
              backgroundColor={COLORS.white}
              radius={15}
              marginBottom={12}>
              <Block rowCenter justifyContent="space-between">
                <Block
                  paddingHorizontal={11}
                  paddingVertical={8}
                  radius={16}
                  backgroundColor={COLORS.bubbles}>
                  <Text fontSize={15} color={COLORS.pictonBlue}>
                    Đã thanh toán
                  </Text>
                </Block>
                <Text fontSize={15} color={COLORS.gray}>
                  20:30 12/01/2023
                </Text>
              </Block>
              <Text fontSize={18} font="medium" marginTop={8}>
                #000000008 - ABCDEF
              </Text>
              <Block
                height={1}
                backgroundColor={COLORS.brightGray}
                marginVertical={12}
              />
              <Block rowCenter justifyContent="space-between">
                <Text fontSize={16}>Thanh toán tiền mặt</Text>
                <Text fontSize={17} font="bold">
                  64.675.650đ
                </Text>
              </Block>
            </Pressable>
          );
        })}
      </ScrollView>
      <Modal animationDuration={0} isVisible={modal}>
        <Block flex backgroundColor={COLORS.ghostWhite}>
          <HeaderTitle title="Điều kiện lọc" onGoBack={() => setModal(false)} />
          <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            {data_filter.map((item, index) => {
              return (
                <Block
                  key={index}
                  marginBottom={4}
                  backgroundColor={COLORS.white}
                  paddingVertical={12}
                  paddingHorizontal={15}>
                  <Text
                    marginBottom={10}
                    fontSize={17}
                    font="medium"
                    color={COLORS.primary}>
                    {item.title}
                  </Text>
                  <Block
                    height={40}
                    radius={20}
                    marginBottom={10}
                    backgroundColor={COLORS.ghostWhite}
                    alignItems="center"
                    justifyContent="center">
                    <Text fontSize={17}>Tất cả</Text>
                  </Block>
                  <Block rowCenter wrap justifyContent="space-between">
                    {item.arr.map((value, i) => {
                      return (
                        <Block
                          marginBottom={10}
                          height={40}
                          radius={20}
                          alignItems="center"
                          justifyContent="center"
                          width={'48%'}
                          backgroundColor={COLORS.ghostWhite}
                          key={i}>
                          <Text fontSize={17}>{value}</Text>
                        </Block>
                      );
                    })}
                  </Block>
                </Block>
              );
            })}
          </ScrollView>
          <Block
            paddingBottom={15}
            paddingTop={15}
            borderTopRightRadius={15}
            borderTopLeftRadius={15}
            paddingHorizontal={15}
            backgroundColor={COLORS.white}>
            <Button title="Lọc" />
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};

export default ManagementOrderScreen;
