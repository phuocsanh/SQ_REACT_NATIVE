import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from 'theme';
import {useAnimateNavbar} from './hooks/useAnimateNavbar';
import {AnimatedNavbarProps} from './type';

const AnimatedNavbar = ({
  scroll,
  imageHeight,
  OverflowHeaderComponent,
  TopNavbarComponent,
  headerHeight,
  headerElevation,
}: AnimatedNavbarProps) => {
  const [headerOpacity, overflowHeaderOpacity] = useAnimateNavbar(
    scroll,
    imageHeight,
    headerHeight,
  );

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            zIndex: headerOpacity,
            height: headerHeight,
            opacity: headerOpacity,
            elevation: headerElevation,
          },
        ]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            height: headerHeight,
            justifyContent: 'center',
            paddingTop: 15,
            zIndex: 99,
          }}
          locations={[0, 0.35, 0.65]}
          colors={['#1464DF', '#1464DF', '#1464DF']}>
          {TopNavbarComponent}
        </LinearGradient>
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          styles.overflowHeader,
          {
            zIndex: overflowHeaderOpacity,
            height: headerHeight,
            opacity: overflowHeaderOpacity,
          },
        ]}>
        {OverflowHeaderComponent}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  overflowHeader: {
    backgroundColor: 'transparent',
  },
});

export default AnimatedNavbar;
