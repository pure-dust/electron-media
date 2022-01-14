/*
 * @Author: Lixiao2
 * @Date: 2021-06-15 15:48:15
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 17:41:20
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ipcRenderer } from 'electron';
import { SystemConfig } from '@root/typings/user-config';

export function preload() {
  return new Promise<SystemConfig>((resolve, reject) => {
    const callback = (ev: Electron.IpcRendererEvent, message: SystemConfig) => {
      resolve(message);
    };
    ipcRenderer.once(`get-config`, callback);
    ipcRenderer.send('get-config');
  });
}
