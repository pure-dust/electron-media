/*
 * @Author: Lixiao2
 * @Date: 2021-06-09 14:50:16
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-09 15:07:40
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { Menu, MenuItem, BrowserWindow } from "electron"

export default function (win: BrowserWindow): void {
  const menu = new Menu()

  menu.append(
    new MenuItem({
      label: "开发者工具",
      submenu: [
        {
          role: "help",
          accelerator: "F12",
          click: () => {
            win.webContents.toggleDevTools()
          },
        },
      ],
    }),
  )

  Menu.setApplicationMenu(menu)
}
