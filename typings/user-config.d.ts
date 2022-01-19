import { Index } from './global';

export declare interface SystemConfig extends Index<any> {
  theme: ThemeConfig;
  novel: NovelConfig;
  lang: string;
}

export declare interface ThemeConfig {
  theme: string;
}

export declare interface NovelConfig {
  color: string;
  size: number;
  background: string;
  count: number;
  lineHeight: number
}

export declare type themeKey = keyof ThemeConfig;

export declare type novelKey = keyof NovelConfig;

export declare interface ConfigItem {
  key: string;
  value: string;
}

export declare type ConfigType = ThemeConfig | NovelConfig;
