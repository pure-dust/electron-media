/*
 * @Author: lixiao
 * @Date: 2022-01-25 11:52:12
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-03-14 16:25:21
 * @Description: Do not edit
 * @Email: 932184220@qq.com
 */
/*
 * @Author: Lixiao2
 * @Date: 2022-01-25 11:52:12
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-03-14 14:26:39
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { Index } from '@root/typings/global';
import { BrowserWindow, globalShortcut } from 'electron';
import { ConfigLoader } from '../config/config';

let sys_simple = false;

export const registerSysHk = (win: BrowserWindow) => {
  globalShortcut.register('CommandOrControl+Alt+num0', () => {
    if (sys_simple) {
      unRegisterComHk(true);
      registerComHk(win);
    } else {
      unRegisterComHk();
      registerComHk(win, true);
    }
    sys_simple = !sys_simple;
  });
  globalShortcut.register('CommandOrControl+Alt+num1', () => {
    win.webContents.send('mini-size');
  });
  globalShortcut.register('CommandOrControl+Alt+numdiv', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });
};

export const registerComHk = (win: BrowserWindow, simple = false) => {
  const conf = ConfigLoader.getInstance();

  let keys = conf.getUserConfig('key') as Index<Array<string>>;

  const keyEvent = {
    prevPage: 'prev-page',
    nextPage: 'next-page',
  };

  for (const key in keyEvent) {
    let shortcut_key = simple
      ? keys[key][keys[key].length - 1]
      : keys[key].join('+');
    globalShortcut.register(shortcut_key, () => {
      win.webContents.send(keyEvent[key]);
    });
  }
};

export const unRegisterComHk = (simple = false) => {
  const conf = ConfigLoader.getInstance();

  let keys = conf.getUserConfig('key') as Index<Array<string>>;

  const keyEvent = {
    prevPage: 'prev-page',
    nextPage: 'next-page',
  };

  for (const key in keyEvent) {
    let shortcut_key = simple
      ? keys[key][keys[key].length - 1]
      : keys[key].join('+');
    globalShortcut.unregister(shortcut_key);
  }
};
