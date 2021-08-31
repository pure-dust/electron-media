/*
 * @Author: Lixiao2
 * @Date: 2021-06-15 15:03:00
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 17:56:56
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { useDatabaseOption, useDatabaseType } from '@/utils/control';
import LocalDB, { TableList } from '@root/database';
import { ipcMain, app, BrowserWindow, IpcMainEvent, Notification } from 'electron';
import { NotificationConstructorOptions } from 'electron/main';
import { ConfigLoader } from '../config/config';

const EventBus = (win: BrowserWindow) => {
  const localDb = LocalDB.getInstance();
  const conf = ConfigLoader.getInstance();
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

  ipcMain.on('use-database', (event: IpcMainEvent, ...message) => {
    try {
      const table = message[0] as TableList;
      const type = message[1] as useDatabaseType;
      const params = message[2] as useDatabaseOption;

      const cb = (msg: any) => {
        event.reply('database-cb', msg);
      };

      switch (type) {
        case 'insert':
          localDb.getTable(table).insert(params.data, cb);
          break;
        case 'find':
          localDb.getTable(table).find(params.query, cb, params.cond);
          break;
        case 'update':
          localDb.getTable(table).update(params.query, params.data, params.update, cb);
          break;
        case 'remove':
          localDb.getTable(table).remove(params.query, params.remove, cb);
          break;
      }
    } catch (error) {
      event.reply('database-cb', error);
    }
  });

  ipcMain.on('notice', (event: IpcMainEvent, message: NotificationConstructorOptions) => {
    new Notification(message).show();
  });
};

export default EventBus;
