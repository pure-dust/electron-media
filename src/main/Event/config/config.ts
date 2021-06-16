/*
 * @Author: Lixiao2
 * @Date: 2021-06-15 11:22:32
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 17:36:44
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { openSync, readFileSync, closeSync, writeFileSync } from 'fs';
import { join } from 'path';
import { app } from 'electron';

export class ConfigLoader {
  private userPath: string;
  private defaultPath: string;
  private config: SysTemConfig = {} as SysTemConfig;
  public loadMessage: string = '';

  static _instance: ConfigLoader | null;
  static getInstance(): ConfigLoader {
    if (!this._instance) return new ConfigLoader();
    else return this._instance;
  }

  constructor() {
    this.userPath = join(app.getPath('userData'), '/config.json');
    this.defaultPath = app.isPackaged
      ? join(app.getPath('exe'), '../resources/config.json')
      : join(__dirname, '../../config.json');
  }

  // 读取配置文件
  private readConfigFile(path: string): SysTemConfig {
    let fd;
    try {
      fd = openSync(path, 'r');
    } catch (err) {
      if (err.code == 'ENOENT') {
        this.loadDefaultConfig();
        writeFileSync(this.userPath, JSON.stringify(this.config), { flag: 'w+' });
        fd = openSync(path, 'r');
      } else {
        throw new Error(err);
      }
    }
    let buffer: string = readFileSync(fd, 'utf-8');
    closeSync(fd);
    return JSON.parse(buffer);
  }

  // 设置配置文件
  private setUserConfig() {
    let fd;
    try {
      fd = openSync(this.userPath, 'w+');
    } catch (err) {
      return null;
    }
    writeFileSync(fd, JSON.stringify(this.config));
    closeSync(fd);
  }

  // 检查复杂类型是否为空--只检查第一层
  private checkIsNull(item: Array<any> | (Object & Index)): boolean {
    if (Array.isArray(item)) {
      return item.filter((el) => this.checkSingle(el)).length > 0;
    } else if (Object.prototype.toString.call(item) == '[object Object]') {
      for (const key in item) {
        if (!this.checkSingle(item[key])) return false;
      }
    }
    return true;
  }

  // 检查简单类型是否为空
  private checkSingle(item: any): boolean {
    return item != null && item != undefined && item != '';
  }

  // 加载默认配置
  private loadDefaultConfig() {
    let defaultConfig: SysTemConfig = this.readConfigFile(this.defaultPath);
    this.config = defaultConfig;
  }

  // 加载用户配置
  private loadUserConfig() {
    let userConfig: SysTemConfig = this.readConfigFile(this.userPath);
    this.config = userConfig;
  }

  // 更新用户配置
  public updateUserConfig(configItem: ConfigItem) {
    if (!this.checkIsNull(configItem)) return;
    this.config[configItem.key] = configItem.value;
    this.setUserConfig();
  }

  // 获取配置项
  public getUserConfig(key?: string): SysTemConfig | string | null {
    if (arguments.length != 0) {
      let keys = Object.keys(this.config);
      let target = keys.find((el) => el == key);
      if (!target) return null;
      else return this.config[target];
    } else return this.config;
  }

  // 初始化配置文件
  public resetDefaultConfig() {
    this.loadDefaultConfig();
    this.setUserConfig();
  }

  // 程序配置初始化
  public configInit() {
    try {
      this.loadUserConfig();
    } catch (error) {
      this.loadMessage = `加载用户配置文件出错: ${error}\n尝试加载默认配置`;
      console.error(`加载用户配置文件出错: ${error}\n尝试加载默认配置`);
      try {
        this.loadDefaultConfig();
      } catch (error) {
        this.loadMessage = `加载默认配置文件出错: ${error}\n请检查程序是否损坏!`;
        console.error(`加载默认配置文件出错: ${error}\n请检查程序是否损坏!`);
      }
    }
  }
}
