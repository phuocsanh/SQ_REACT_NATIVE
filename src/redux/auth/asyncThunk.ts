import {ResponseData} from 'models';
import {createAppAsyncThunk, handleThunkError} from 'redux/helper';
import api from 'util/api';
import storage from 'util/storage';
export const checkPhone = createAppAsyncThunk(
  'action_checkPhone',
  async (phone: string, thunkApi) => {
    try {
      const result = await api.get<any>(`booking/api/check_phone/${phone}`);
      return result;
    } catch (error) {
      return handleThunkError(thunkApi, error);
    }
  },
);
export const refreshToken = createAppAsyncThunk(
  'action_refreshToken',
  async (body: {user_id: string; refresh_token: string}, thunkApi) => {
    try {
      const result = await api.postForm<
        ResponseData<{access_token: string; refresh_token: string}>
      >('booking/api/refresh_token', body);
      storage.setValue('userToken', result.data?.access_token || '');
      storage.setValue('refreshToken', result.data?.refresh_token || '');
      return result;
    } catch (error) {
      // thunkApi.dispatch(clearUserToken());
      // thunkApi.dispatch(clearDriverInfo());
      // thunkApi.dispatch(expiredToken(false));
      storage.delete('userToken');
      return handleThunkError(thunkApi, error);
    }
  },
);
