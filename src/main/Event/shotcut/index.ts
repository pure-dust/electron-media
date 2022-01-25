/*
 * @Author: Lixiao2
 * @Date: 2022-01-25 11:52:12
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-25 14:05:34
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { Index } from '@root/typings/global';
import { BrowserWindow, globalShortcut } from 'electron';
import { ConfigLoader } from '../config/config';

export default function (win: BrowserWindow) {
  const conf = ConfigLoader.getInstance();

  let keys = conf.getUserConfig('key') as Index<Array<string>>;
  console.log(keys);

  const keyEvent = {
    miniSize: 'mini-size',
    prevPage: 'prev-page',
    nextPage: 'next-page',
  };

  for (const key in keys) {
    globalShortcut.register(keys[key].join('+'), () => {
      win.webContents.send(keyEvent[key]);
    });
  }
}
