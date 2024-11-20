import {StyleSheet} from 'react-native';

export const DEFAULT_STYLES = StyleSheet.create({
  row: {flexDirection: 'row'},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  contentCenter: {justifyContent: 'center', alignItems: 'center'},
  wrap: {flexWrap: 'wrap'},
  absoluteFillObject: StyleSheet.absoluteFillObject,
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },

  shadow1: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  shadow2: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  shadow3: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  shadow4: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  shadow5: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadow6: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  shadowSky: {
    backgroundColor: '#fff',
    shadowColor: '#80c0d9',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
});
