import {Animated, ScrollView} from 'react-native';
import React, {forwardRef} from 'react';
import AnimatedNavbar from './AnimatedNavbar';

import {AnimatedHeader} from './AnimatedHeader';
import {AnimatedScrollViewProps} from './type';
import {HEADER_HEIGHT, IMG_HEADER_HEIGHT} from 'theme/constant';
import {useAnimateScrollView} from './hooks/useAnimateScrollView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const AnimatedScrollView = forwardRef<
  ScrollView,
  AnimatedScrollViewProps
>(
  (
    {
      TopNavBarComponent,
      HeaderNavbarComponent,
      HeaderComponent,
      headerMaxHeight,
      topBarHeight,
      topBarElevation,
      headerImage,
      disableScale,
      children,
      imageStyle,
      ...props
    }: AnimatedScrollViewProps,
    ref,
  ) => {
    const imageHeight = headerMaxHeight || IMG_HEADER_HEIGHT;
    const headerNavHeight = topBarHeight || HEADER_HEIGHT;
    const headerElevation = topBarElevation || 0;
    const [scroll, onScroll, scale, translateYDown, translateYUp] =
      useAnimateScrollView(imageHeight, disableScale);
    const {top} = useSafeAreaInsets();

    return (
      <>
        <Animated.ScrollView
          ref={ref}
          onScroll={onScroll}
          scrollEventThrottle={16}
          {...props}>
          <AnimatedHeader
            HeaderComponent={HeaderComponent}
            headerImage={headerImage}
            imageStyle={imageStyle}
            imageHeight={imageHeight}
            translateYDown={translateYDown}
            translateYUp={translateYUp}
            scale={scale}
          />
          {children}
        </Animated.ScrollView>
        <AnimatedNavbar
          headerElevation={headerElevation}
          headerHeight={headerNavHeight + top / 2}
          scroll={scroll}
          imageHeight={imageHeight}
          OverflowHeaderComponent={HeaderNavbarComponent}
          TopNavbarComponent={TopNavBarComponent}
        />
      </>
    );
  },
);
