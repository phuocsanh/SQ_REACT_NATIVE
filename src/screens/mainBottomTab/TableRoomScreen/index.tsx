import React from 'react';
import {COLORS} from 'theme';
import {Block, ScrollView} from 'components';
import ItemOrder from './components/ItemOrder';
import {Header} from './components/Header';

const TableRoomScreen = () => {
  return (
    <Block flex backgroundColor={COLORS.white}>
      <ScrollView>
        <Header />
        <Block
          paddingBottom={100}
          row
          wrap
          justifyContent="space-between"
          paddingVertical={12}
          paddingHorizontal={15}
          backgroundColor={COLORS.ghostWhite}>
          {Array.from({length: 30}).map((item, idx) => (
            <ItemOrder key={idx} item={item} index={idx} />
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
};

export default TableRoomScreen;
