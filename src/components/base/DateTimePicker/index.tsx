import DTPicker, {AndroidNativeProps, IOSNativeProps} from '@react-native-community/datetimepicker';
import {Block, Modal, Pressable, Text} from 'components';
import React, {useState} from 'react';
import {COLORS} from 'theme';
import {IS_IOS} from 'util/constant';

export type DateTimePickerIOSProps = {
  isVisible?: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onDatePick: (date: Date) => void;
} & IOSNativeProps;

export type DateTimePickerAndroidProps = {
  isVisible?: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onDatePick: (date: Date) => void;
} & AndroidNativeProps;

export type DateTimePickerProps = DateTimePickerAndroidProps | DateTimePickerIOSProps;

const DateTimePickerIOS = ({
  onDatePick,
  value,
  isVisible,
  setIsVisible,
  ...pickerProps
}: DateTimePickerIOSProps) => {
  const [_date, setDate] = useState(value);

  return (
    <Modal position="bottom" isVisible={isVisible} setIsVisible={setIsVisible}>
      <Block
        safeMarginBottom
        backgroundColor="white"
        marginHorizontal={15}
        radius={10}
        paddingVertical={15}>
        <DTPicker
          timeZoneName={'Asia/Bangkok'}
          locale="vi-VN"
          themeVariant="light"
          textColor="black"
          value={_date}
          onChange={(_, v) => {
            if (v) {
              setDate(v);
            }
          }}
          {...pickerProps}
        />
        <Block row paddingHorizontal={10}>
          <Pressable
            height={40}
            radius={10}
            marginRight={10}
            backgroundColor={COLORS.primary}
            flex
            contentCenter
            onPress={() => {
              setIsVisible(false);
              onDatePick(_date);
            }}>
            <Text color={COLORS.white} font="semiBold">
              {'Xác nhận'}
            </Text>
          </Pressable>
          <Pressable
            height={40}
            radius={10}
            backgroundColor={COLORS.red}
            flex
            contentCenter
            onPress={() => setIsVisible(false)}>
            <Text color={'white'} font="semiBold">
              {'Hủy'}
            </Text>
          </Pressable>
        </Block>
      </Block>
    </Modal>
  );
};

const DateTimePickerAndroid = ({
  setIsVisible,
  isVisible,
  onDatePick,
  ...pickerProps
}: DateTimePickerAndroidProps) => {
  return isVisible ? (
    <DTPicker
      timeZoneName={'Asia/Bangkok'}
      onChange={(e, v) => {
        setIsVisible(false);
        if (e.type === 'set') {
          if (v) {
            onDatePick(v);
          }
        }
      }}
      {...pickerProps}
    />
  ) : null;
};

export const DateTimePicker = (props: DateTimePickerProps) => {
  if (IS_IOS) {
    return <DateTimePickerIOS {...(props as DateTimePickerIOSProps)} />;
  }

  return <DateTimePickerAndroid {...(props as DateTimePickerAndroidProps)} />;
};