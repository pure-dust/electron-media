/*
 * @Author: Lixiao2
 * @Date: 2021-06-15 15:03:00
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 17:56:56
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ipcMain, app, BrowserWindow, IpcMainEvent } from 'electron';
import { ConfigLoader } from '../config/config';

const EventBus = (win: BrowserWindow) => {
  let conf = ConfigLoader.getInstance();
  conf.configInit();

  ipcMain.on('get-config', (event: IpcMainEvent, message?: string) => {
    let replyEvent = 'did-config-load' + (message ? `-${message}` : '');
    event.reply(replyEvent, conf.getUserConfig(message));
  });

  ipcMain.on('set-config', (event: IpcMainEvent, message: ConfigItem) => {
    conf.updateUserConfig(message);
  });

  ipcMain.on('min-window', () => {
    win.minimize();
  });

  ipcMain.on('fix-window', (event: IpcMainEvent, message: boolean) => {
    if (typeof message == 'boolean') {
      win.setAlwaysOnTop(message, 'screen-saver');
    }
    event.reply('get-fixed-window', win.isAlwaysOnTop());
  });

  ipcMain.on('close-window', () => {
    app.quit();
  });
};

export default EventBus;
