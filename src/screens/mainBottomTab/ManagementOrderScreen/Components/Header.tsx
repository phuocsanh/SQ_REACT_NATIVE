import {ICONS} from 'assets';
import {Block, Icon, Image, Pressable, StatusBar} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import {HEADER_TOP_OFFSET} from 'theme';

export const Header = ({
  setModal,
  modal,
}: {
  setModal: (e: boolean) => void;
  modal: boolean;
}) => {
  const {top} = useSafeAreaInsets();
  return (
    <Block
      backgroundColor={COLORS.primary}
      style={{
        paddingTop: top + HEADER_TOP_OFFSET,
      }}>
      <StatusBar />
      <Block paddingHorizontal={15} marginBottom={12}>
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
                setModal(!modal);
              }}>
              <Image
                source={ICONS.ic_filter}
                square={40}
                resizeMode="contain"
              />
            </Pressable>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
