/* Lưu ý: nếu dùng MMKV không thể debug trên chrome hoặc RN Debugger 0.14.0
chờ RN Debugger 0.15 hoặc tham khảo debug trên Reactotron */
import {FcmMessage} from 'models';
import {MMKV} from 'react-native-mmkv';
import {doNothing} from './helper';

export type StorageMessageKey =
  | 'newNotification'
  | 'messageBooking'
  | 'messageDelivery'
  | 'messageRevenue'
  | 'messageDefault'
  | 'messageTripCancel'
  | 'messageRequestPictureDriver';

type KeyValue = {
  userToken: string;
  refreshToken: string;
  userId: string;
  username: string;
  password: string;
  messasgeTripId: string;
  keepScreenOn: boolean;
  isRefreshing: boolean;
  updatePositionTime: number;
  updatePositionTimeFirebase: number;
  baseUrl: string;
} & {
  [key in StorageMessageKey]: FcmMessage;
};

class Storage extends MMKV {
  getValue<K extends keyof KeyValue, V extends KeyValue[K] | undefined>(key: K): V {
    switch (key) {
      //number
      case 'updatePositionTime':
      case 'updatePositionTimeFirebase':
        return super.getNumber(key) as V;
      // boolean
      case 'isRefreshing':
      case 'keepScreenOn':
        return super.getBoolean(key) as V;
      // string
      case 'userToken':
      case 'refreshToken':
      case 'userId':
      case 'username':
      case 'password':
      case 'messasgeTripId':
      case 'baseUrl':
        return super.getString(key) as V;
      // object
      default:
        return this.getObject(key) as V;
    }
  }

  setValue<K extends keyof KeyValue>(key: K, value: KeyValue[K]) {
    switch (typeof value) {
      case 'boolean':
      case 'string':
      case 'number':
        return super.set(key, value);
      default:
        return this.setObject(key, value);
    }
  }

  delete(key: keyof KeyValue) {
    return super.delete(key);
  }

  private setObject(key: string, object: object) {
    try {
      const jsonString = JSON.stringify(object);
      super.set(key, jsonString);
    } catch (error) {
      doNothing(error);
    }
  }

  private getObject(key: string) {
    try {
      const jsonString = super.getString(key);
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      throw new Error(`No value for key: ${key}`);
    } catch (error) {
      doNothing(error);

      return undefined;
    }
  }
}

const storage = new Storage();

export default storage;
