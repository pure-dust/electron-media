interface Window {
  /** 关闭预加载动画 */
  ClosePreloadLoading: () => void;
  /** 运行时环境 */
  APP_ENV: 'development' | 'production';
}

type Nullable<T> = T | null;

interface SysTemConfig {
  [key: string]: string;
  theme: string;
}

interface ConfigItem extends Index<string> {
  key: string;
  value: string;
}

interface Index<T> {
  [key: string]: T;
}

type EventType = 'meeting' | 'travel' | 'normal';

interface ScheduleType {
  start: Date;
  end: Date;
  event: string;
  type?: EventType;
  special?: boolean;
}

interface AddScheduleOption {
  hour: number;
  start: number;
  end: number;
}
