import {Platform} from 'react-native';
import {BASE_URL} from './api';

export const BUILD_VERSION = '1610.2108';

export const enum CHATS_CHANEL {
  chats_user_driver = 'chats_user_driver',
}
export const DEFAULT_MAP_DELTA = {
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export const HO_CHI_MINH_CITY_REGION = {
  latitude: 10.762622,
  longitude: 106.660172,
  ...DEFAULT_MAP_DELTA,
};

export const MAX_SIZE_IMAGE = 5000000;
export const MAX_HEIGHT_IMAGE = 2000;
export const MAX_WIDTH_IMAGE = 2000;

export const VERSION = '1.1.12.0611';

export const DEFAULT_MAP_DELTA_DRIVER = {
  latitudeDelta: 0.0175,
  longitudeDelta: 0.0065,
};

export const URI_IMG = `${BASE_URL}/media/api/uploads/`;

export const IS_IOS = Platform.OS === 'ios';

export const APP_INFO = {
  androidBundleId: 'com.imsvietnamese.skydriver',
  iosBundleId: 'com.imsvietnamese.skydriver',
  iosAppStoreId: '6475289205',
} as const;

export const INSTALL_APP_URL = Platform.select({
  android: `https://play.google.com/store/apps/details?id=${APP_INFO.androidBundleId}`,
  ios: `itms-apps://itunes.apple.com/app/${APP_INFO.iosAppStoreId}`,
}) as string;
