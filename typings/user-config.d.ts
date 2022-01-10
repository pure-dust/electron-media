interface SystemConfig extends Index<any> {
  theme: ThemeConfig;
  novel: NovelConfig;
  lang: string;
}

interface ThemeConfig {
  theme: string;
}

interface NovelConfig {
  color: string;
  size: number;
  background: string;
  count: number;
}

type themeKey = keyof ThemeConfig;

type novelKey = keyof NovelConfig;

interface ConfigItem {
  key: string;
  value: string;
}

type ConfigType = ThemeConfig | NovelConfig;
