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
    },
  });
  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));
}

const historyDir = path.join(__dirname, "/QRsHistory");

app.whenReady().then(() => {
  ipcMain.handle("storage", () => store.get("unicorn"));

  createWindow();

  if (!fs.existsSync(historyDir)) {
    fs.mkdirSync(historyDir);
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  fs.rmSync(historyDir, { recursive: true, force: true });
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("toMain", (event, args) => {
  console.log("ping");
  store.set("unicorn", "😱");
  mainWindow.webContents.send("fromMain", store.get("unicorn"));

  const dirName = Date.now() + "";

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }

  QRCode.toString(
    "https://myclub.public.gr/user-connection?storeCode=PBL_ONBOARDING_SHOP_7050",
    { type: "svg" },
    function (err, url) {
      console.log(url);
      fs.writeFile(path.join(__dirname, "/test.svg"), url, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }
  );

  //   fs.readFile("path/to/file", (error, data) => {
  //     // Do something with file contents

  //     // Send result back to renderer process
  //     mainWindow.webContents.send("fromMain", responseObj);
  //   });
});
