const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#080a0d",
      symbolColor: "#95B8F1",
      height: 45,
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  const indexFile = path.join(__dirname, "index.html")
  win.loadURL(indexFile)

  win.maximize();
  win.show();
}


app.whenReady()
  .then(() => {
    createWindow()

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    })
})


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
})
