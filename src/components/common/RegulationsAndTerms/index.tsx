import {Text} from 'components';
import {navigationRoot} from 'navigation/navigationRef';
import React from 'react';
import {COLORS} from 'theme';
type EmptyDataProps = {
  marginTop?: number;
  marginBottom?: number;
};
export const RegulationsAndTerms = ({marginTop = 0, marginBottom = 0}: EmptyDataProps) => {
  return (
    <Text
      marginTop={marginTop}
      marginBottom={marginBottom}
      textAlign={'center'}
      color={COLORS.backgroundIcon}
      fontSize={14}
      font={'regular'}>
      {'Bằng việc nhấn vào nút '}
      <Text fontSize={14} font={'semiBold'} color={COLORS.backgroundIcon}>
        {'Tiếp tục, '}
      </Text>
      {'bạn đã đồng ý với '}
      <Text
        textAlign={'center'}
        color={COLORS.primary}
        fontSize={14}
        font={'regular'}
        onPress={() => {
          navigationRoot.navigate('RegulationScreen');
        }}>
        {'Quy chế '}
      </Text>
      {'và'}
      <Text
        textAlign={'center'}
        color={COLORS.primary}
        fontSize={14}
        font={'regular'}
        onPress={() => {
          navigationRoot.navigate('RulesScreen');
        }}>
        {' Điều khoản '}
      </Text>
      {'của chúng tôi'}
    </Text>
  );
};
