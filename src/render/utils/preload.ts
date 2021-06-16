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

const GET_THEME = 'theme';

export function perload() {
  return new Promise((resolve, reject) => {
    ipcRenderer.on(`did-config-load-${GET_THEME}`, (ev, message) => {
      Store.commit('setTheme', message);
      resolve(null);
    });
    ipcRenderer.send('get-config', GET_THEME);
  });
}
