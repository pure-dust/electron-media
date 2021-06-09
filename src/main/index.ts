import { BrowserWindow, app } from "electron"
const path = require("path")
const isDevelopment = process.env
import menuEvent from "./Event/Menu/index"
let win: BrowserWindow

function getLoadURL() {
  return app.isPackaged
    ? `file://${path.join(__dirname, "../render/index.html")}`
    : `http://localhost:${process.env.PORT}`
}

app.on("ready", async () => {
  win = new BrowserWindow({
    width: 960,
    height: 540,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  menuEvent(win)

  win.loadURL(getLoadURL())
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      const { default: installExtension } = require("electron-devtools-installer")
      var vue_devtools_beta = { id: "ljjemllljcmogpfapbkkighbhhppjdbg", electron: ">=1.2.1" }
      var result = await installExtension(vue_devtools_beta)
      if (result) {
        console.log("success load : " + result)
      }
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString())
    }
  }
})
