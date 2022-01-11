import axios, {
  AxiosRequestConfig,
  Method,
  AxiosInstance,
  AxiosResponse,
  Canceler,
  ResponseType,
} from 'axios';
import _ from 'lodash';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 60 * 10,
});

interface MapValue {
  result: Object;
  lastTime: number;
}

type CacheMap = Map<string, MapValue>;

const cacheMap: CacheMap = new Map();
interface CacheOption extends AxiosRequestConfig {
  cache?: boolean;
  time?: number;
}

axiosInstance.interceptors.request.use((config) => {
  let c = config as CacheOption;
  let cancel: Canceler;
  config.cancelToken = new axios.CancelToken((c) => (cancel = c));
  if (c.cache) {
    let key = c.url + JSON.stringify(c.params);
    let cache = cacheMap.get(key);
    let cur = new Date().getTime();
    if (!cache?.lastTime) return config;
    if ((cache && cur - cache.lastTime < cache.lastTime) || (cache && c.time === 0)) {
      cancel(JSON.stringify(cache.result));
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    let c = response.config as CacheOption;
    if (c.cache) {
      let key = c.url + JSON.stringify(c.params);
      cacheMap.set(key, {
        lastTime: new Date().getTime(),
        result: response,
      });
    }
    return response;
  },
  (err) => {
    if (axios.isCancel(err)) {
      return Promise.resolve(JSON.parse(err.message));
    }
    return Promise.reject(err);
  },
);

function axiosRequest(
  method: Method,
  url: string,
  params?: any,
  data?: any,
  config: AxiosRequestConfig = { headers: {} },
) {
  const axiosConfig = {
    method,
    url: url,
    params,
    data,
    ...config,
  };

  return axiosInstance(axiosConfig)
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
}

function download(
  method: Method,
  url: string,
  params?: any,
  data?: any,
  config: AxiosRequestConfig = { headers: {} },
) {
  const axiosConfig = {
    method,
    url: url,
    params,
    responseType: 'blob' as ResponseType,
    data,
    ...config,
  };
  return axiosInstance(axiosConfig)
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
}

const instance: CusAxiosInstance = {
  axiosInstance,
  get: (url: string, params?: any, config?: CacheOption) =>
    axiosRequest('GET', url, params, null, config),
  delete: (url: string, data?: any, config?: CacheOption) =>
    axiosRequest('DELETE', url, null, data, config),
  post: (url: string, data?: any, config?: CacheOption) =>
    axiosRequest('POST', url, null, data, config),
  patch: (url: string, data?: any, config?: CacheOption) =>
    axiosRequest('PATCH', url, null, data, config),
  put: (url: string, data?: any, config?: CacheOption) =>
    axiosRequest('PUT', url, null, data, config),
  download: (url: string, data?: any, config?: CacheOption) =>
    download('GET', url, null, data, config),
};

export default instance;

export interface CusAxiosInstance {
  axiosInstance: AxiosInstance;
  get(url: string, params?: any, config?: CacheOption): Promise<AxiosResponse<any>>;
  delete: (url: string, data?: any, config?: CacheOption) => Promise<AxiosResponse<any>>;
  post: (url: string, data?: any, config?: CacheOption) => Promise<AxiosResponse<any>>;
  patch: (url: string, data?: any, config?: CacheOption) => Promise<AxiosResponse<any>>;
  put: (url: string, data?: any, config?: CacheOption) => Promise<AxiosResponse<any>>;
  download: (url: string, data?: any, config?: CacheOption) => Promise<AxiosResponse<any>>;
}
