/*
 * @Author: Lixiao2
 * @Date: 2021-06-16 11:07:36
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 15:01:13
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ipcRenderer, IpcRendererEvent } from "electron"

export const setColor = (message: ConfigItem) => {
  ipcRenderer.send("set-config", message)
}

export const windowMove = (canMove: boolean) => {
  ipcRenderer.send("window-move-open", canMove)
}

export const minScreen = () => {
  ipcRenderer.send("min-window")
}

export const fixWindow = (fixed?: boolean) => {
  ipcRenderer.send("fix-window", fixed)
  return new Promise((resolve, reject) => {
    ipcRenderer.on("get-fixed-window", (event: IpcRendererEvent, message: boolean) => {
      resolve(message)
    })
  })
}

export const closeWindow = () => {
  ipcRenderer.send("close-window")
}
