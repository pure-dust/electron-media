/*
 * @Author: Lixiao2
 * @Date: 2021-06-16 11:00:59
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 11:29:27
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { screen, ipcMain, BrowserWindow } from "electron"

export default (win: BrowserWindow) => {
  let winStartPosition = { x: 0, y: 0 }
  let mouseStartPosition = { x: 0, y: 0 }
  let movingInterval: NodeJS.Timeout = null as unknown as NodeJS.Timeout

  ipcMain.on("window-move-open", (events, canMoving) => {
    if (canMoving) {
      const winPosition = win.getPosition()
      winStartPosition = { x: winPosition[0], y: winPosition[1] }
      mouseStartPosition = screen.getCursorScreenPoint()
      if (movingInterval) {
        clearInterval(movingInterval)
      }
      movingInterval = setInterval(() => {
        const cursorPosition = screen.getCursorScreenPoint()
        const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x
        const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y
        win.setPosition(x, y, true)
      }, 5)
    } else {
      clearInterval(movingInterval)
      movingInterval = null as unknown as NodeJS.Timeout
    }
  })
}
