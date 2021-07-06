interface SysTemConfig {
  [key: string]: string;
  theme: string;
}

interface ConfigItem extends Index<string> {
  key: string;
  value: string;
}
