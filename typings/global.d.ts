interface Window {
  /** 关闭预加载动画 */
  ClosePreloadLoading: () => void
  /** 运行时环境 */
  APP_ENV: "development" | "production"
}

type Nullable<T> = T | null

interface SysTemConfig {
  [key: string]: string
  theme: string
}

interface ConfigItem extends Index {
  key: string
  value: string
}

interface Index {
  [key: string]: string
}
