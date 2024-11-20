import {Block, Icon, Pressable, StatusBar, Text} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React, {ReactElement} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import {HEADER_HEIGHT, HEADER_TOP_OFFSET} from 'theme';

export type HeaderTitleProps = {
  title: string;
  titleSize?: number;
  canGoBack?: boolean;
  onGoBack?: () => void;
  topOffset?: number;
  height?: number;
  renderRight?: () => ReactElement;
};

export const HeaderTitle = ({
  title,
  titleSize = 17,
  canGoBack = true,
  onGoBack = navigationRoot.goBack,
  topOffset = HEADER_TOP_OFFSET,
  height = HEADER_HEIGHT,
  renderRight,
}: HeaderTitleProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <Block
      backgroundColor={COLORS.primary}
      paddingBottom={10}
      style={{
        paddingTop: top > 30 ? 30 + topOffset : top + topOffset,
      }}>
      <StatusBar />
      <Block height={height} paddingHorizontal={15}>
        <Block marginTop={13} rowCenter height={28}>
          {canGoBack && (
            <Pressable
              round={40}
              onPress={onGoBack}
              contentCenter
              backgroundColor={COLORS.denim}>
              <Icon
                type="FontAwesome6"
                name="arrow-left"
                size={20}
                color={COLORS.white}
              />
            </Pressable>
          )}
          <Text
            marginLeft={15}
            color={COLORS.white}
            font="medium"
            fontSize={titleSize}
            flex
            numberOfLines={1}>
            {title}
          </Text>
          {renderRight && renderRight()}
        </Block>
      </Block>
    </Block>
  );
};
