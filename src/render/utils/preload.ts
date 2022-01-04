/*
 * @Author: Lixiao2
 * @Date: 2021-06-15 15:48:15
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 17:41:20
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ipcRenderer } from 'electron';

import Store from '@/store/index';

export function perload() {
  return new Promise((resolve, reject) => {
    const callback = (ev: Electron.IpcRendererEvent, message: SystemConfig) => {
      Store.commit('setTheme', message.theme);
      Store.commit('setNovel', message.novel);
      Store.commit('setLang', message.lang)
      resolve(null);
      ipcRenderer.off(`get-config`, callback);
    };
    ipcRenderer.on(`get-config`, callback);
    ipcRenderer.send('get-config');
  });
}
