/*
 * @Author: Lixiao2
 * @Date: 2021-06-15 15:03:00
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-19 17:54:41
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import {
  ipcMain,
  app,
  BrowserWindow,
  IpcMainEvent,
  Notification,
  dialog,
} from 'electron';
import { useDatabaseOption, useDatabaseType } from '@/utils/control';
import LocalDB, { TableList } from '@root/database';
import NovelAnalyser from '../novel';

import { FileInfo } from '@root/typings/novel';
import { ConfigItem } from '@root/typings/user-config';
import { NotificationConstructorOptions } from 'electron/main';
import { ConfigLoader } from '../config/config';

const EventBus = (win: BrowserWindow) => {
  const localDb = LocalDB.getInstance();
  const conf = ConfigLoader.getInstance();
  conf.configInit();

  ipcMain.on('get-config', (event: IpcMainEvent, message?: string) => {
    event.reply('get-config', conf.getUserConfig(message));
  });

  ipcMain.on('set-config', (event: IpcMainEvent, message: ConfigItem) => {
    conf
      .updateUserConfig(message)
      .then((res) => {
        event.reply('get-config', res);
      })
      .catch((err) => {
        event.reply('get-config', err);
      });
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
          localDb
            .getTable(table)
            .update(params.query, params.data, params.update, cb);
          break;
        case 'remove':
          localDb.getTable(table).remove(params.query, params.remove, cb);
          break;
      }
    } catch (error) {
      event.reply('database-cb', error);
    }
  });

  ipcMain.on(
    'notice',
    (event: IpcMainEvent, message: NotificationConstructorOptions) => {
      new Notification(message).show();
    },
  );

  ipcMain.on('select-file', (event: IpcMainEvent) => {
    dialog
      .showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
          {
            name: '小说',
            extensions: ['txt'],
          },
        ],
      })
      .then(({ canceled, filePaths }) => {
        if (!canceled) {
          let fileList = filePaths.map((el) => {
            return {
              name: el.split(/(\\\\|\\|\/)/).splice(-1)[0],
              path: el,
            };
          }) as Array<FileInfo>;
          event.reply('select-file', fileList);
        } else {
          event.reply('select-file', {
            message: '取消选择',
            error: new Error('取消选择'),
          });
        }
      });
  });

  ipcMain.on('analyse-file', (event: IpcMainEvent, message: string) => {
    let info = NovelAnalyser.analyse(message);
    event.reply('analyse-file', info);
  });
  ipcMain.on('get-chapter', (event: IpcMainEvent, message: string) => {
    let content = NovelAnalyser.getChapter(message);
    event.reply('get-chapter', content);
  });

  ipcMain.on('mini-size', (event: IpcMainEvent, { width, height }) => {
    win.resizable = true;
    win.setSize(width, height);
    win.resizable = false;
  });
};

export default EventBus;
