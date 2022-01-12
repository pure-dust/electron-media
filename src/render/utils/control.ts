/*
 * @Author: Lixiao2
 * @Date: 2021-06-16 11:07:36
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 15:01:13
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { TableList } from '@root/database';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { NotificationConstructorOptions } from 'electron/main';
import { RemoveOptions, UpdateOptions } from 'nedb';

export const getConfig = (message: string) => {
  ipcRenderer.send('get-config', message);
  return new Promise<string | ConfigType>((resolve, reject) => {
    ipcRenderer.on('get-config', (event: IpcRendererEvent, message: string | ConfigType) => {
      resolve(message);
    });
  });
};

export const setConfig = (message: ConfigItem) => {
  ipcRenderer.send('set-config', message);
  return new Promise<boolean>((resolve, reject) => {
    ipcRenderer.on('set-config', (event: IpcRendererEvent, message: boolean) => {
      resolve(message);
    });
  });
};

export const windowMove = (canMove: boolean) => {
  ipcRenderer.send('window-move-open', canMove);
};

export const minScreen = () => {
  ipcRenderer.send('min-window');
};

export const fixWindow = (fixed?: boolean) => {
  ipcRenderer.send('fix-window', fixed);
  return new Promise((resolve, reject) => {
    ipcRenderer.on('get-fixed-window', (event: IpcRendererEvent, message: boolean) => {
      resolve(message);
    });
  });
};

export const closeWindow = () => {
  ipcRenderer.send('close-window');
};

export type useDatabaseType = 'insert' | 'find' | 'update' | 'remove';

interface SortType extends Index<any> {
  createdAt?: number;
  updatedAt?: number;
}

export interface CondType extends Index<any> {
  sort?: SortType; //排序
  limit?: number; //分页限制
  skip?: number; //跳过某个数据
  projection?: Index<any>; //返回指定字段
}

export interface useDatabaseOption extends Object {
  data?: any;
  query?: any;
  update?: UpdateOptions;
  remove?: RemoveOptions;
  cond?: CondType;
}

export const useDatabase = (table: TableList, type: useDatabaseType, params: useDatabaseOption) => {
  ipcRenderer.send('use-database', table, type, params);
  return new Promise((reslove, reject) => {
    ipcRenderer.on('database-cb', (event: IpcRendererEvent, message: NedbCbParams) => {
      message.status === 'success' ? reslove(message.message) : reject(message.message);
    });
  });
};

export const notifyAction = (notice: NotificationConstructorOptions) => {
  ipcRenderer.send('notice', notice);
};

export const selectFile = () => {
  ipcRenderer.send('select-file');
  return new Promise<Array<FileInfo>>((resolve, reject) => {
    ipcRenderer.on(
      'select-file',
      (event: IpcRendererEvent, message: Array<FileInfo> | RunTimeError) => {
        if ('error' in message) {
          reject(message);
        } else {
          resolve(message);
        }
      },
    );
  });
};
