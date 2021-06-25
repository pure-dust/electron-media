import axios, { AxiosRequestConfig, Method } from 'axios';
import _ from 'lodash';

const axiosInstance = axios.create({
  baseURL: process.env.REQUEST_BASE_API,
  withCredentials: true,
  timeout: 1000 * 60 * 10,
});

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
    .then((res) => ({
      data: res.data,
      res,
    }))
    .catch((error) => {
      throw error;
    });
}

export default {
  axiosInstance,
  get: (url: string, params?: any, config?: AxiosRequestConfig) =>
    axiosRequest('GET', url, params, null, config),
  delete: (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosRequest('DELETE', url, null, data, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosRequest('POST', url, null, data, config),
  patch: (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosRequest('PATCH', url, null, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosRequest('PUT', url, null, data, config),
};
