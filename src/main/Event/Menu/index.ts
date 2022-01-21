/*
 * @Author: Lixiao2
 * @Date: 2021-06-09 14:50:16
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-21 10:40:20
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import {
  app,
  Menu,
  MenuItem,
  BrowserWindow,
  globalShortcut,
  Tray,
} from 'electron';
import { join } from 'path';

const icon = app.isPackaged
  ? join(app.getPath('exe'), '../resources/fish.ico')
  : join(__dirname, '../../fish.ico');

export default function (win: BrowserWindow): void {
  const menu = new Menu();
  const tray = new Tray(icon);

  menu.append(
    new MenuItem({
      label: '开发者工具',
      role: 'help',
      accelerator: 'F12',
      click: () => {
        win.webContents.toggleDevTools();
      },
    }),
  );
  menu.append(
    new MenuItem({
      label: '退出',
      click: () => {
        app.quit();
      },
    }),
  );
  Menu.setApplicationMenu(menu);

  globalShortcut.register('CommandOrControl+Alt+num1', () => {
    win.webContents.send('mini-size');
  });

  globalShortcut.register('CommandOrControl+Alt+numadd', () => {
    win.webContents.send('next-page');
  });

  globalShortcut.register('CommandOrControl+Alt+numsub', () => {
    win.webContents.send('prev-page');
  });

  app.whenReady().then(() => {
    tray.setToolTip('kl-tools');
    tray.setContextMenu(menu);
  });
}
