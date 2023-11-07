const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

let win;
// app.disableHardwareAcceleration();

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 280,
    height: 300,
    // alwaysOnTop: true,
    // thickFrame: false,

    // titleBarStyle: "hidden",
    frame: false,
    transparent: true,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.setAlwaysOnTop(true, "screen-saver");

  function loadWindow() {
    setTimeout(() => {
      win.loadURL("http://localhost:5173").catch(loadWindow);
    }, 3000);
  }
  loadWindow();
  win.setPosition(screen.getPrimaryDisplay().workAreaSize.width / 4 - 150, 0);

  ipcMain.handle("resize", (event, height) => {
    win.setBounds({ height });
  });

  // Open the DevTools.
  // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
