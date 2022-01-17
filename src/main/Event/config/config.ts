/*
 * @Author: Lixiao2
 * @Date: 2021-06-15 11:22:32
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-17 11:18:04
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { openSync, readFileSync, closeSync, writeFileSync } from 'fs';
import { join } from 'path';
import { app } from 'electron';
import { Index } from '@root/typings/global';
import { SystemConfig, ConfigItem } from '@root/typings/user-config';

export class ConfigLoader {
  private userPath: string;
  private defaultPath: string;
  private config: SystemConfig = {} as SystemConfig;
  public loadMessage: string = '';

  static _instance: ConfigLoader | null;
  static getInstance(): ConfigLoader {
    if (!this._instance) {
      let configLoader = new ConfigLoader();
      this._instance = configLoader;
      return configLoader;
    } else return this._instance;
  }

  constructor() {
    this.userPath = join(app.getPath('userData'), '/config.json');
    this.defaultPath = app.isPackaged
      ? join(app.getPath('exe'), '../resources/config.json')
      : join(__dirname, '../../config.json');
  }

  // 读取配置文件
  private readConfigFile(path: string): SystemConfig {
    let fd;
    try {
      fd = openSync(path, 'r');
    } catch (err: any) {
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
    writeFileSync(fd, JSON.stringify(this.config, undefined, 2));
    closeSync(fd);
  }

  // 检查复杂类型是否为空--只检查第一层
  private checkIsNull(item: Array<any> | (Object & Index<any>)): boolean {
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
    let defaultConfig: SystemConfig = this.readConfigFile(this.defaultPath);
    this.config = defaultConfig;
  }

  // 加载用户配置
  private loadUserConfig() {
    let userConfig: SystemConfig = this.readConfigFile(this.userPath);
    this.config = userConfig;
  }

  // 更新用户配置
  public updateUserConfig(configItem: ConfigItem) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        if (!this.checkIsNull(configItem)) return;
        let search = configItem.key.split('.');
        if (search.length > 1) {
          this.config[search[0]][search[1]] = configItem.value;
        } else {
          this.config[configItem.key] = configItem.value;
        }
        this.setUserConfig();
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  // 获取配置项
  public getUserConfig(key?: string): SystemConfig | string | null {
    if (key) {
      let keys = Object.keys(this.config);
      let search = key.split('.');
      if (search.length > 1) {
        let val = this.config;
        for (let i = 0; i < search.length; i++) {
          val = val?.[search[i]];
        }
        return val;
      } else {
        let target = keys.find((el) => el == key);
        if (!target) return null;
        return this.config[target];
      }
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
