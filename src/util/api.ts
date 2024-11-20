import axios from 'axios';
import {isObjectLike} from 'lodash';
import {AnyObject, ApiResponse} from 'models/common';
import queryString from 'query-string';
import storage from './storage';

export const LOCAL_URL = 'https://test.skycorp.vn/sky/gateway/v1';
export const REMOTE_URL = 'https://api.skycorp.vn/v1';

export const BASE_URL = __DEV__
  ? // DEV URL ✅ chỉnh ở đây
    LOCAL_URL
  : // BUILD URL: ❌ Không chỉnh sửa ở đây
    storage.getValue('baseUrl') || REMOTE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

instance.interceptors.request.use(
  config => {
    const token = storage.getValue('userToken');
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }
    return config;
  },
  error => {
    throw error;
  },
);

instance.interceptors.response.use(
  response => {
    if (response.data.code && response.data.code !== 200) {
      throw {response};
    }
    return response;
  },
  error => {
    throw error;
  },
);

const isFile = (object: AnyObject) => {
  if (object.uri && object.type) {
    return true;
  }
  return false;
};

const transformPostFormData = (object: AnyObject | FormData = {}) => {
  if (object instanceof FormData) {
    return object;
  }
  const formData = new FormData();
  for (const [key, value] of Object.entries(object)) {
    if (isObjectLike(value)) {
      if (Array.isArray(value) && isFile(value[0])) {
        value.forEach(v => {
          formData.append(key, v);
        });
      } else if (isFile(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    } else if (value != null) {
      formData.append(key, value);
    }
  }
  return formData;
};

const transformPostData = (object: AnyObject = {}) => {
  const newObject: AnyObject = {};
  for (const [key, value] of Object.entries(object)) {
    if (isObjectLike(value)) {
      newObject[key] = JSON.stringify(value);
    } else {
      newObject[key] = value;
    }
  }
  return queryString.stringify(newObject);
};

const api = {
  get: async <T = void>(
    url: string & (T extends void ? 'Bạn chưa khai báo kiểu trả về' : string),
    params?: unknown,
  ): Promise<T> => {
    const response = await instance.get<T>(url, {params});
    return response.data;
  },
  /** form-urlencoded */
  post: async <T = ApiResponse>(url: string, body?: AnyObject, params?: unknown): Promise<T> => {
    const data = transformPostData(body);
    const response = await instance.post<T>(url, data, {params});
    return response.data;
  },
  /** form-data */
  postForm: async <T = ApiResponse>(
    url: string,
    body?: AnyObject | FormData,
    params?: unknown,
  ): Promise<T> => {
    const data = transformPostFormData(body);
    const response = await instance.postForm<T>(url, data, {params});
    return response.data;
  },
  /** raw-JSON */
  postRaw: async <T = ApiResponse>(
    url: string,
    body?: AnyObject | FormData,
    params?: unknown,
  ): Promise<T> => {
    const data = JSON.stringify(body);
    const response = await instance.post<T>(url, data, {
      params,
      headers: {'Content-Type': 'application/json'},
    });
    return response.data;
  },
  /** form-urlencoded */
  put: async <T = ApiResponse>(url: string, body?: AnyObject, params?: unknown): Promise<T> => {
    const data = transformPostData(body);
    const response = await instance.put<T>(url, data, {params});
    return response.data;
  },
  /** form-data */
  putForm: async <T = ApiResponse>(
    url: string,
    body?: AnyObject | FormData,
    params?: unknown,
  ): Promise<T> => {
    const data = transformPostFormData(body);
    const response = await instance.putForm<T>(url, data, {params});
    return response.data;
  },
  /** raw-JSON */
  putRaw: async <T = ApiResponse>(
    url: string,
    body?: AnyObject | FormData,
    params?: unknown,
  ): Promise<T> => {
    const data = JSON.stringify(body);
    const response = await instance.put<T>(url, data, {
      params,
      headers: {'Content-Type': 'application/json'},
    });
    return response.data;
  },
  /** form-urlencoded */
  patch: async <T = ApiResponse>(url: string, body?: AnyObject, params?: unknown): Promise<T> => {
    const data = transformPostData(body);
    const response = await instance.patch<T>(url, data, {params});
    return response.data;
  },
  /** form-data */
  patchForm: async <T = ApiResponse>(
    url: string,
    body?: AnyObject | FormData,
    params?: unknown,
  ): Promise<T> => {
    const data = transformPostFormData(body);
    const response = await instance.patchForm<T>(url, data, {params});
    return response.data;
  },
  /** raw-JSON */
  patchRaw: async <T = ApiResponse>(
    url: string,
    body?: AnyObject | FormData,
    params?: unknown,
  ): Promise<T> => {
    const data = JSON.stringify(body);
    const response = await instance.patch<T>(url, data, {
      params,
      headers: {'Content-Type': 'application/json'},
    });
    return response.data;
  },
  delete: async <T = ApiResponse>(url: string, params?: unknown): Promise<T> => {
    const response = await instance.delete<T>(url, {params});
    return response.data;
  },
};

export default api;
