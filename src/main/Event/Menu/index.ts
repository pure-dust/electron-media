/*
 * @Author: Lixiao2
 * @Date: 2021-06-09 14:50:16
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-20 15:14:53
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { Menu, MenuItem, BrowserWindow, globalShortcut } from 'electron';

export default function (win: BrowserWindow): void {
  const menu = new Menu();

  menu.append(
    new MenuItem({
      label: '开发者工具',
      submenu: [
        {
          role: 'help',
          accelerator: 'F12',
          click: () => {
            win.webContents.toggleDevTools();
          },
        },
      ],
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
}
