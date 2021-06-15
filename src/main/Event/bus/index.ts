/*
 * @Author: Lixiao2
 * @Date: 2021-06-15 15:03:00
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-15 16:57:18
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ipcMain, BrowserWindow } from "electron"
import { ConfigLoader } from "../config/config"

const EventBus = (win: BrowserWindow) => {
  let conf = new ConfigLoader()
  conf.configInit()
  ipcMain.on("get-config", (event, message?: string) => {
    let replyEvent = "did-config-load" + (message ? `-${message}` : "")
    event.reply(replyEvent, conf.getUserConfig(message))
  })

  ipcMain.on("set-config", (event, message: ConfigItem) => {
    console.log(message)
    conf.updateUserConfig(message)
  })
}

export default EventBus
