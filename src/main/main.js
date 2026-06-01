import { app, BrowserWindow, } from 'electron';
import path from 'path';
import fs from 'fs';

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.webContents.openDevTools();
  win.loadFile('./index.html');
  const [_1, _2, ...rest] = process.argv;
  const message = { argv: rest, };
  fs.writeFileSync(path.join(__dirname, 'message'), JSON.stringify(message));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
