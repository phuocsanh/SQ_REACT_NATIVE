/* eslint-disable @typescript-eslint/no-shadow */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunk, GetThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {useDeepCompareEffect} from 'hooks';
import {
  AnyObject,
  ApiResponse,
  AppAxiosError,
  PagingParams,
  PagingResponseData,
  ResponseData,
} from 'models/common';
import {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {AppDispatch, RootState} from 'redux/store';
import {useAppDispatch} from './hooks';
import {AsyncThunkConfig} from './type';
import {clearUserToken, expiredToken} from './auth/slice';
import {refreshToken} from './auth/asyncThunk';
import storage from 'util/storage';
import {SKIP_TOKEN} from './constant';

export const createAppAsyncThunk =
  createAsyncThunk.withTypes<AsyncThunkConfig>();

export const handleThunkError = (
  thunkApi: GetThunkAPI<{state: RootState; dispatch: AppDispatch}>,
  err: unknown,
  isShowErr?: boolean,
) => {
  let error = err as AppAxiosError;
  if (error.response) {
    // console.log('=======');
    // console.log(error.response?.config.url);
    // console.log(error.response?.status);
    // console.log(error.response?.data?.message);
    switch (error.response.status) {
      case 500:
        if (isShowErr) {
          Toast.show({
            type: 'toastCustom',
            text1: 'Hệ thống bận vui lòng thử lại!',
            props: {type: 'error'},
          });
        }
        break;
      case 401:
        if (error.response?.config.url === 'booking/api/refresh_token') {
          storage.delete('userToken');
          thunkApi.dispatch(expiredToken(true));
          thunkApi.dispatch(clearUserToken());
        } else {
          const user_id = thunkApi.getState().auth.userId;
          const refresh_token = storage.getValue('refreshToken');
          const isRefreshing = storage.getValue('isRefreshing');
          if (user_id && refresh_token && !isRefreshing) {
            storage.setValue('isRefreshing', true);
            thunkApi
              .dispatch(refreshToken({user_id, refresh_token}))
              .finally(() => {
                storage.setValue('isRefreshing', false);
              });
          }
        }
        break;
      case 302:
        if (error.response?.config.url === 'booking/api/refresh_token') {
          storage.delete('userToken');
          thunkApi.dispatch(expiredToken(true));
          thunkApi.dispatch(clearUserToken());
        } else {
          const user_id = thunkApi.getState().auth.userId;
          const refresh_token = storage.getValue('refreshToken');
          const isRefreshing = storage.getValue('isRefreshing');
          if (user_id && refresh_token && !isRefreshing) {
            storage.setValue('isRefreshing', true);
            thunkApi
              .dispatch(refreshToken({user_id, refresh_token}))
              .finally(() => {
                storage.setValue('isRefreshing', false);
              });
          }
        }
        break;
      case 200:
        const {code, message, data} = error.response.data;

        if (code === 403) {
          storage.delete('userToken');
          thunkApi.dispatch(expiredToken(true));
          thunkApi.dispatch(clearUserToken());
        }

        if (code === 400 && isShowErr) {
          Toast.show({
            type: 'toastCustom',
            text2:
              Object.keys(data || {}).length > 0
                ? Object.values(data || {})[0][0]
                : message,
            props: {type: 'error'},
          });
        }
        break;
      default:
        if (isShowErr) {
          Toast.show({
            type: 'toastCustom',
            text1: 'Có lỗi. Vui lòng thử lại!',
            props: {type: 'error'},
          });
        }
        break;
    }

    return thunkApi.rejectWithValue(error.response.data);
  } else {
    throw err;
  }
};

export const createQueryPagingHook =
  <D, R extends PagingResponseData<D>, A extends PagingParams>(
    asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>,
  ) =>
  (params: A, {skip = false} = {}) => {
    const dispatch = useAppDispatch();
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [numshow, setNumshow] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(
      !(skip || params === SKIP_TOKEN),
    );
    const [isLoadmore, setIsLoadmore] = useState(false);
    const [data, setData] = useState<R['data']>();
    const [error, setError] = useState<unknown>();
    const [countRefresh, setCountRefresh] = useState(0);
    const [pageRequest, setPageRequest] = useState(1);
    const [result, setResult] = useState<R>();

    const request = useCallback(
      async (params: A) => {
        try {
          const p = params?.p;
          if (p && p > 1) {
            setIsLoadmore(true);
          } else {
            setIsLoading(true);
          }
          setError(undefined);
          const res = await dispatch(asyncThunk(params)).unwrap();
          const newData =
            res.current_page > 1 && data ? [...data, ...res.data] : res.data;
          setIsLoading(false);
          setIsLoadmore(false);
          setNumshow(res.per_page);
          setPage(res.current_page);
          setTotal(res.total);
          setTotalPage(res.total_pages);
          setData(newData);
          setResult(res);
          return res;
        } catch (e) {
          setError(e);
          setIsLoading(false);
          setIsLoadmore(false);
        }
      },
      [data, dispatch],
    );

    const refresh = useCallback(() => {
      setCountRefresh(c => c + 1);
    }, []);

    const loadmore = useCallback(() => {
      if (page < totalPage && !isLoading && !isLoadmore && data?.length) {
        setPageRequest(page + 1);
      }
    }, [data?.length, isLoading, isLoadmore, page, totalPage]);

    useDeepCompareEffect(() => {
      if (skip || params === SKIP_TOKEN) {
        return;
      }
      setPageRequest(params?.p || 1);
      request(params).catch(() => {});
    }, [skip, params, countRefresh]);

    useEffect(() => {
      if (pageRequest > 1) {
        const _params = params
          ? {...params, p: pageRequest, limit: numshow}
          : {p: pageRequest, limit: numshow};
        request(_params as A).catch(() => {});
      }
    }, [pageRequest]);

    return {
      total,
      totalPage,
      page,
      numshow,
      isLoading,
      isLoadmore,
      error,
      request,
      refresh,
      loadmore,
      data,
      result,
    };
  };

export const createQueryHook =
  <D, R extends ResponseData<D> | ApiResponse | AnyObject | undefined, A>(
    asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>,
  ) =>
  (params: A, {skip = false} = {}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(
      !(skip || params === SKIP_TOKEN),
    );
    const [data, setData] =
      useState<R extends ResponseData<D> ? R['data'] : undefined>();
    const [error, setError] = useState<unknown>();
    const [result, setResult] = useState<R>();
    const [countRefresh, setCountRefresh] = useState(0);

    const request = useCallback(
      async (params: A) => {
        try {
          setIsLoading(true);
          setError(undefined);
          const res = await dispatch(asyncThunk(params)).unwrap();
          if (res && 'data' in res) {
            setData(res.data);
          }
          setIsLoading(false);
          setResult(res);
          return res;
        } catch (e) {
          setError(e);
          setIsLoading(false);
          throw e;
        }
      },
      [dispatch],
    );

    const refresh = useCallback(() => {
      setCountRefresh(c => c + 1);
    }, []);

    useDeepCompareEffect(() => {
      if (skip || params === SKIP_TOKEN) {
        return;
      }
      request(params).catch(() => {});
    }, [skip, params, countRefresh]);

    return {
      isLoading,
      error,
      request,
      data,
      result,
      refresh,
    };
  };

export const createMutationHook =
  <R, A>(asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>) =>
  () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<R>();
    const [error, setError] = useState<unknown>();

    const request = useCallback(
      async (arg: A) => {
        try {
          setIsLoading(true);
          setError(undefined);
          const res = await dispatch(asyncThunk(arg)).unwrap();
          setIsLoading(false);
          setResult(res);
          return res;
        } catch (e) {
          setError(e);
          setIsLoading(false);
          throw e;
        }
      },
      [dispatch],
    );

    return {
      isLoading,
      error,
      request,
      result,
    };
  };
