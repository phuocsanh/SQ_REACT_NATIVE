import React from 'react';
import {
  RefreshControl,
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ScrollViewProps = {
  refreshing?: boolean;
  onRefresh?: () => void;
  safeAreaBottom?: boolean;
  setRef?: React.LegacyRef<RNScrollView> | undefined;
} & RNScrollViewProps;

export const ScrollView = ({
  refreshing = false,
  onRefresh,
  contentContainerStyle,
  safeAreaBottom,
  setRef,

  ...rest
}: ScrollViewProps) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <RNScrollView
      ref={setRef}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      contentContainerStyle={[
        safeAreaBottom && {paddingBottom: 100 + bottom},
        contentContainerStyle,
      ]}
      {...rest}
    />
  );
};
