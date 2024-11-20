import {ICONS} from 'assets';
import {Block, Button, ButtonProps, Image, Modal} from 'components';
import {Text} from 'components';
import React from 'react';
import {TextProps, ViewProps} from 'react-native';
import {COLORS} from 'theme';

type InfomationPopupProps = {
  type: 'warning' | 'info' | 'error' | 'success';
  title: string;
  content: string;
  subcontent1?: string;
  styleSubContent1?: TextProps['style'];
  subcontent2?: string;
  styleSubContent2?: TextProps['style'];
  styleContent?: TextProps['style'];
  titleBtnLeft?: string;
  titleBtnRight: string;
  propsBtnLeft?: Omit<ButtonProps, 'title'>;
  propsBtnRight?: Omit<ButtonProps, 'title'>;
  handleBtnLeft?: () => void;
  handleBtnRight: () => void;
};
export const InfomationPopup = ({
  type,
  title,
  content,
  subcontent1,
  subcontent2,
  styleSubContent1,
  styleSubContent2,
  styleContent,
  titleBtnLeft,
  titleBtnRight,
  handleBtnLeft,
  handleBtnRight,
  propsBtnLeft,
  propsBtnRight,
}: InfomationPopupProps) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return ICONS.ic_toastWarningIcon;
      case 'info':
        return ICONS.ic_toastInfoIcon;
      case 'error':
        return ICONS.ic_toastErrorIcon;
      case 'success':
        return ICONS.ic_toastSuccessIcon;
      default:
        return ICONS.ic_toastInfoIcon;
    }
  };
  return (
    <Modal isVisible position="center">
      <Block backgroundColor={COLORS.white} marginHorizontal={12} radius={10} padding={15}>
        <Image alignSelf="center" source={getIcon()} square={60} resizeMode="contain" />
        <Text
          fontSize={20}
          font="bold"
          alignSelf="center"
          marginTop={15}
          color={
            type === 'warning'
              ? COLORS.cadmiumOrange
              : type === 'error'
              ? COLORS.red
              : type === 'success'
              ? COLORS.yellowGreen
              : type === 'info'
              ? COLORS.blue
              : COLORS.raisinBlack
          }>
          {title}
        </Text>
        <Text textAlign="center" fontSize={16} marginTop={15} style={styleContent}>
          {content}
        </Text>
        {subcontent1 && (
          <Text textAlign="center" fontSize={16} marginTop={15} style={styleSubContent1}>
            {subcontent1}
          </Text>
        )}
        {subcontent2 && (
          <Text textAlign="center" fontSize={16} marginTop={15} style={styleSubContent2}>
            {subcontent2}
          </Text>
        )}
        <Block rowCenter marginTop={30}>
          {titleBtnLeft && (
            <Button
              marginRight={7.5}
              title={titleBtnLeft}
              flex
              color={COLORS.primary}
              onPress={handleBtnLeft}
              {...propsBtnLeft}
            />
          )}
          <Button
            marginLeft={titleBtnLeft ? 7.5 : 0}
            title={titleBtnRight}
            flex
            onPress={handleBtnRight}
            {...propsBtnRight}
          />
        </Block>
      </Block>
    </Modal>
  );
};
