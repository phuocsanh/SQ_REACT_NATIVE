import {ICONS} from 'assets';
import {Block} from 'components/base/Block';
import {Icon} from 'components/base/Icon';
import {Image} from 'components/base/Image';
import {Modal} from 'components/base/Modal';
import {Pressable} from 'components/base/Pressable';
import {Text} from 'components/base/Text';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';

const leftKey = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '000', '.'];
export const DiscountPopup = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (isShow: boolean) => void;
}) => {
  const {bottom} = useSafeAreaInsets();
  const [typeDiscount, setTypeDiscount] = useState<
    'dollar' | 'percent' | undefined
  >(undefined);
  return (
    <Modal
      isAbsoluteView
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}>
      <Block
        paddingBottom={bottom + 15}
        paddingHorizontal={15}
        backgroundColor={COLORS.white}
        borderTopLeftRadius={15}
        borderTopRightRadius={15}>
        <Text
          marginTop={20}
          textAlign="center"
          fontSize={20}
          font="medium"
          color={COLORS.primary}>
          Chiết khấu
        </Text>
        <Block rowCenter marginTop={25}>
          <Block
            justifyContent="center"
            flex={2.5}
            borderWidth={1}
            borderColor={COLORS.brightGray}
            radius={5}
            height={45}>
            <Text
              color={COLORS.gray}
              fontSize={18}
              marginHorizontal={10}
              numberOfLines={2}>
              0
            </Text>
          </Block>

          <Block rowCenter marginLeft={10} flex>
            <Pressable
              onPress={() => setTypeDiscount('percent')}
              borderTopLeftRadius={5}
              borderBottomLeftRadius={5}
              height={45}
              contentCenter
              flex
              backgroundColor={
                typeDiscount === 'percent'
                  ? COLORS.pictonBlue
                  : COLORS.ghostWhite
              }>
              <Icon
                type={'FontAwesome5'}
                name="percent"
                size={19}
                color={typeDiscount === 'percent' ? COLORS.white : COLORS.black}
              />
            </Pressable>
            <Pressable
              onPress={() => setTypeDiscount('dollar')}
              borderTopRightRadius={5}
              borderBottomRightRadius={5}
              height={45}
              contentCenter
              flex
              backgroundColor={
                typeDiscount === 'dollar'
                  ? COLORS.pictonBlue
                  : COLORS.ghostWhite
              }>
              <Icon
                type="Foundation"
                name="dollar"
                size={30}
                color={typeDiscount === 'dollar' ? COLORS.white : COLORS.black}
              />
            </Pressable>
          </Block>
        </Block>
        <Block rowCenter marginTop={5}>
          <Block flex={2.5} row wrap justifyContent="space-between">
            {leftKey.map((i, idx) => {
              return (
                <Pressable
                  radius={5}
                  height={45}
                  marginTop={10}
                  backgroundColor={COLORS.ghostWhite}
                  contentCenter
                  width={'30%'}
                  key={idx}>
                  <Text fontSize={22}>{i}</Text>
                </Pressable>
              );
            })}
          </Block>
          <Block marginLeft={10} flex marginTop={10}>
            <Pressable
              radius={5}
              height={45}
              marginBottom={10}
              contentCenter
              backgroundColor={COLORS.ghostWhite}>
              <Image source={ICONS.ic_multiplication} width={39} height={21} />
            </Pressable>
            <Pressable
              radius={5}
              height={45}
              contentCenter
              marginBottom={10}
              backgroundColor={COLORS.ghostWhite}>
              <Text fontSize={22}>C</Text>
            </Pressable>
            <Pressable
              radius={5}
              flex
              contentCenter
              backgroundColor={COLORS.primary}>
              <Text fontSize={22} color={COLORS.white}>
                OK
              </Text>
            </Pressable>
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

export default DiscountPopup;
