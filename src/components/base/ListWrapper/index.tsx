import {Block, EmptyData, Loading} from 'components';
import {COLORS} from 'theme';
import React, {ReactElement} from 'react';
import {ActivityIndicator, FlatListProps, ViewStyle} from 'react-native';
import {FlatList, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ListWrapperProps<T> = {
  data?: T[];
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string;
  isLoading?: boolean;
  refreshing?: boolean;
  horizontal?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  EmptyComponent?: React.ElementType;
  emptyTitle?: string;
  backgroundColor?: string;
  emptyNull?: boolean;
  HolderComponent?: React.ElementType;
  style?: ViewStyle;
  numColumns?: number;
  paddingTopContent?: number;
  safeAreaBottom?: number;
  renderHeader?: () => ReactElement;
  loadingHeader?: boolean;
  isLoadMore?: boolean;
  onEndReachedThreshold?: number;
  setRef?: React.LegacyRef<FlatList<T>> | undefined;
  contentContainerStyle?: ViewStyle;
} & FlatListProps<T>;
export const ListWrapper = <T,>({
  data,
  isLoading = false,
  refreshing = false,
  horizontal = false,
  onRefresh,
  onLoadMore,
  EmptyComponent,
  emptyTitle,
  backgroundColor = COLORS.white,
  emptyNull,
  HolderComponent,
  renderItem,
  keyExtractor,
  style,
  numColumns = 1,
  paddingTopContent,
  safeAreaBottom,
  renderHeader,
  loadingHeader = false,
  isLoadMore = false,
  onEndReachedThreshold = 0.5,
  setRef,
  contentContainerStyle,
  ...rest
}: ListWrapperProps<T>) => {
  const {bottom} = useSafeAreaInsets();

  if (isLoading && !isLoadMore) {
    return HolderComponent && loadingHeader ? (
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader && renderHeader?.()}
        <HolderComponent />
      </ScrollView>
    ) : HolderComponent ? (
      <HolderComponent />
    ) : null;
  }

  const _keyExtractor = (item: T, index: number) => {
    return keyExtractor ? keyExtractor(item, index) : String(index);
  };

  const _renderEmpty = () => {
    if (isLoading) {
      return HolderComponent ? <HolderComponent /> : <Loading />;
    } else {
      return EmptyComponent ? (
        <EmptyComponent />
      ) : emptyNull ? null : (
        <EmptyData title={emptyTitle} />
      );
    }
  };

  const _renderLoadMore = () => {
    return (
      <Block marginVertical={12}>
        <Loading />
        <ActivityIndicator size={30} color={COLORS.backgroundIcon} />
      </Block>
    );
  };

  return (
    <Block style={style}>
      <FlatList
        contentContainerStyle={[
          {
            flexGrow: 1,
            paddingTop: 0 || paddingTopContent,
            paddingBottom: safeAreaBottom
              ? typeof safeAreaBottom === 'number'
                ? safeAreaBottom
                : bottom
              : 0,
            backgroundColor: backgroundColor,
          },
          contentContainerStyle,
        ]}
        ref={setRef}
        horizontal={horizontal}
        data={data || []}
        numColumns={numColumns}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        ListEmptyComponent={_renderEmpty}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onLoadMore}
        onEndReachedThreshold={onEndReachedThreshold}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={renderHeader?.()}
        ListFooterComponent={isLoadMore ? _renderLoadMore() : null}
        {...rest}
      />
    </Block>
  );
};
