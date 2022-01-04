interface SystemConfig extends Index<any> {
  theme: ThemeConfig;
  novel: NovelConfig;
  lang: string;
}

interface ThemeConfig extends Index<string> {
  theme: string;
}

interface NovelConfig extends Index<string | number> {
  color: string;
  size: number;
  background: string;
  count: number;
}

interface ConfigItem extends Index<string> {
  key: string;
  value: string;
}

type ConfigType = ThemeConfig | NovelConfig;
