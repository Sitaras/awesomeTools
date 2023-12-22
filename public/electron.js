const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const Store = require("electron-store");
var QRCode = require("qrcode");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

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

const historyDirName = `${app.getPath("appData")}/QRsHistory`;

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

  const qrData = urlsArray
    ?.filter((url) => !!url)
    ?.map((url) => {
      const urlFilename = url
        ?.replace(/^https?:\/\//, "")
        ?.replaceAll("/", "_");
      const savedPath = `${storagePath}/${urlFilename}.${extension}`;

      QRCode.toFile(savedPath, url, { type: extension }, function (err) {
        if (err) throw err;
      });

      return {
        id: `${url}${Date.now()}`,
        file: path.resolve(savedPath),
        fileName: urlFilename,
        extension: extension,
      };
    });

  mainWindow.webContents.send("qrData", qrData);
});

ipcMain.on("saveQRfile", (event, fileData) => {
  const options = {
    title: "Save QR",
    defaultPath: app.getPath("documents"),
    filters: [
      {
        name: fileData?.fileName,
        extensions: [fileData?.extension],
      },
    ],
  };

  dialog
    .showSaveDialog(mainWindow, options)
    .then(({ filePath }) => {
      if (!filePath) return;
      const origin = fs.createReadStream(fileData?.file, { flags: "r" });
      const destination = fs.createWriteStream(filePath, { flags: "w+" });
      origin.pipe(destination);
    })
    .catch((err) => {});
});
