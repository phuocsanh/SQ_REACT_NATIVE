import {Dimensions} from 'react-native';

export const DESIGN_WIDTH = 428;
export const DESIGN_HEIGHT = 926;

export const {width, height} = Dimensions.get('screen');

export const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

export const HEADER_HEIGHT = 50;
export const IMG_HEADER_HEIGHT = 300;

export const HEADER_TOP_OFFSET = 15;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export {SCREEN_WIDTH, SCREEN_HEIGHT};
