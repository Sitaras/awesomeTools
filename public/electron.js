const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const Store = require("electron-store");
var QRCode = require("qrcode");

const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;
const store = new Store();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      ...(isDev && { webSecurity: false }),
    },
  });

  isDev && mainWindow.webContents.openDevTools();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));
}

const historyDirName = "QRsHistory";

app.whenReady().then(() => {
  ipcMain.handle("storage", () => store.get("unicorn"));

  createWindow();

  if (!fs.existsSync(historyDirName)) {
    fs.mkdirSync(historyDirName);
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  fs.rmSync(historyDirName, { recursive: true, force: true });
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("convertUrlsToQRs", (event, urlsArray) => {
  const dirName = Date.now() + "";
  const storagePath = `${historyDirName}/${dirName}`;

  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  const extension = "svg";

  const qrData = urlsArray?.map((url) => {
    const urlFilename = url?.replace(/^https?:\/\//, "")?.replaceAll("/", "_");
    const savedPath = `${storagePath}/${urlFilename}.${extension}`;

    QRCode.toString(url, { type: extension }, function (err, urlData) {
      fs.writeFile(savedPath, urlData, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });

    return {
      id: url,
      file: "file://" + path.resolve(savedPath),
      fileName: urlFilename,
      extension: extension,
    };
  });

  // console.log(qrData);

  mainWindow.webContents.send("qrData", qrData);
  //   fs.readFile("path/to/file", (error, data) => {
  //     // Do something with file contents

  //     // Send result back to renderer process
  //   });
});
