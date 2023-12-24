const { contextBridge, ipcRenderer } = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    // whitelist channels
    const validChannels = [
      "convertUrlsToQRs",
      "saveQRfile",
      "saveQRfilesFolder",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ["qrData", "saveQRfile", "saveQRfilesFolder"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  store: () =>
    ipcRenderer.invoke("storage").then((result) => {
      console.log(result);
      return result;
    }),
});
