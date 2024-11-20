import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import persistStorage from 'redux/persistStorage';

type State = {
  isExpiredToken: boolean;
  userToken?: string;
  refreshToken?: string;
  userId?: string;
  username?: string;
  password?: string;
  turnOnBiometrics?: boolean;
};

const initialState: State = {
  isExpiredToken: false,
  userToken: undefined,
  refreshToken: undefined,
  userId: undefined,
  username: undefined,
  password: undefined,
  turnOnBiometrics: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    expiredToken: (state, action: PayloadAction<boolean>) => {
      state.isExpiredToken = action.payload;
    },
    saveBiometrics: (state, action: PayloadAction<boolean>) => {
      state.turnOnBiometrics = action.payload;
    },
    clearUserToken: state => {
      state.userToken = undefined;
    },
  },
});

export const {expiredToken, saveBiometrics, clearUserToken} = slice.actions;

const persistConfig = {
  key: 'auth',
  storage: persistStorage,
  whitelist: [
    'userToken',
    'refreshToken',
    'userId',
    'driverRegisterInfo',
    'username',
    'password',
  ],
};

export default persistReducer(persistConfig, slice.reducer);
