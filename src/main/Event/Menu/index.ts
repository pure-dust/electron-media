/*
 * @Author: Lixiao2
 * @Date: 2021-06-09 14:50:16
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-25 13:57:59
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { app, Menu, MenuItem, BrowserWindow, Tray } from 'electron';
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

  app.whenReady().then(() => {
    tray.setToolTip('kl-tools');
    tray.setContextMenu(menu);
  });
}
