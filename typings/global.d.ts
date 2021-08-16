// import './schedule';

interface Window {
  /** 关闭预加载动画 */
  ClosePreloadLoading: () => void;
  /** 运行时环境 */
  APP_ENV: 'development' | 'production';
}

type Nullable<T> = T | null;

interface Index<T> {
  [key: string]: T;
}

interface NedbCbParams {
  status: 'error' | 'success';
  message: Error | any;
}
