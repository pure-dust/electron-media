interface Window {
  /** 关闭预加载动画 */
  ClosePreloadLoading: () => void;
  /** 运行时环境 */
  APP_ENV: 'development' | 'production';
}

type Nullable<T> = T | null;

export declare interface Index<T> {
  [key: string]: T;
}

export declare interface NedbCbParams {
  status: 'error' | 'success';
  message: Error | any;
}

export declare interface RecursiveIndex {
  [key: string]: string | RecursiveIndex;
}

export declare interface RunTimeError {
  message: string;
  error: Error;
}

declare module 'vue' {
  export interface GlobalComponents {
    KlButton: typeof import('../src/render/components/button/src/index.vue')
  }
}