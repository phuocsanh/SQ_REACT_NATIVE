import axios from 'axios';
import remoteConfig from './remoteConfig';

const mapAPI = axios.create({
  timeout: 30000,
  baseURL: 'https://rsapi.goong.io',
});

mapAPI.interceptors.request.use(
  config => {
    config.params = {
      api_key: remoteConfig.getGoongApiKey(),
      ...config.params,
    };
    return config;
  },
  error => {
    throw error;
  },
);

mapAPI.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    throw error;
  },
);

export default mapAPI;
