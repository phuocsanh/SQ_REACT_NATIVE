import {Block, ScrollView} from 'components';
import {COLORS} from 'theme';
import React from 'react';
import {Header} from './components/Header';
import ItemOrder from './components/ItemOrder';
const HomeScreen = () => {
  return (
    <Block flex backgroundColor={COLORS.white}>
      <Header />
      <ScrollView>
        <Block
          paddingBottom={100}
          row
          wrap
          justifyContent="space-between"
          paddingVertical={12}
          paddingHorizontal={15}
          backgroundColor={COLORS.ghostWhite}></Block>
      </ScrollView>
    </Block>
  );
};

export default HomeScreen;
