import { Index } from './global';

export declare interface SystemConfig extends Index<any> {
  lang: string;
  theme: ThemeConfig;
  novel: NovelConfig;
  key: ShortCut;
}

export declare interface ThemeConfig {
  theme: string;
  width: number;
  height: number;
}

export declare interface NovelConfig {
  color: string;
  size: number;
  background: string;
  count: number;
  lineHeight: number;
  transparent: boolean;
}

export declare interface ShortCut {
  miniSize: Array<string>;
  prevPage: Array<string>;
  nextPage: Array<string>;
}

export declare type themeKey = keyof ThemeConfig;

export declare type novelKey = keyof NovelConfig;

export declare type cutKey = keyof ShortCut

export declare interface ConfigItem {
  key: string;
  value: string;
}

export declare type ConfigType = ThemeConfig | NovelConfig;
