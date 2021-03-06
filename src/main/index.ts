import { BrowserWindow, app } from 'electron';
const path = require('path');
const isDevelopment = process.env;

import menuEvent from './Event/Menu/index';
import eventBus from './Event/event/index';
import moveEvent from './Event/move/index';
import { registerComHk, registerSysHk } from './Event/shotcut';

import { ConfigLoader } from './Event/config/config';

const conf = ConfigLoader.getInstance();

let width = (conf.getUserConfig('theme.width') as unknown as number) || 540;
let height = (conf.getUserConfig('theme.height') as unknown as number) || 400;

let win: BrowserWindow;

function getLoadURL() {
  return app.isPackaged
    ? `file://${path.join(__dirname, '../render/index.html')}`
    : `http://localhost:${process.env.PORT}`;
}

const getLock = app.requestSingleInstanceLock();

if (!getLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.on('ready', async () => {
    win = new BrowserWindow({
      width,
      height,
      resizable: false,
      frame: false,
      transparent: true,
      hasShadow: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    win.shadow = true;
    win.loadURL(getLoadURL());

    menuEvent(win);
    eventBus(win);
    moveEvent(win);
    registerSysHk(win);
    registerComHk(win);

    if (isDevelopment && !process.env.IS_TEST) {
      try {
        const {
          default: installExtension,
        } = require('electron-devtools-installer');
        var vue_devtools_beta = {
          id: 'ljjemllljcmogpfapbkkighbhhppjdbg',
          electron: '>=1.2.1',
        };
        var result = await installExtension(vue_devtools_beta);
        if (result) {
          console.log('success load : ' + result);
        }
      } catch (e: any) {
        console.error('Vue Devtools failed to install:', e.toString());
      }
    }
  });
}
