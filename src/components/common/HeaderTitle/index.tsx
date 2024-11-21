import {Block, Icon, Pressable, StatusBar, Text} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React, {ReactElement} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, COLORS_GRADIENT} from 'theme';
import {HEADER_HEIGHT, HEADER_TOP_OFFSET} from 'theme';

export type HeaderTitleProps = {
  title: string;
  titleSize?: number;
  canGoBack?: boolean;
  onGoBack?: () => void;
  renderRight?: () => ReactElement;
};

export const HeaderTitle = ({
  title,
  titleSize = 18,
  canGoBack = true,
  onGoBack = navigationRoot.goBack,
  renderRight,
}: HeaderTitleProps) => {
  const {top} = useSafeAreaInsets();
  return (
    <Block style={{paddingTop: top + HEADER_TOP_OFFSET}}>
      <LinearGradient
        style={{
          paddingTop: top,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
        }}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={COLORS_GRADIENT.header}>
        <StatusBar />
        <Block height={HEADER_HEIGHT} paddingHorizontal={12}>
          <Block marginTop={13} rowCenter height={28}>
            {canGoBack && (
              <Pressable
                onPress={onGoBack}
                alignSelf="stretch"
                contentCenter
                paddingRight={15}>
                <Icon
                  type="FontAwesome6"
                  name="angle-left"
                  size={20}
                  color={COLORS.white}
                />
              </Pressable>
            )}
            <Text
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
      </LinearGradient>
    </Block>
  );
};
