const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('core', {
  resize: (height) => {
    ipcRenderer.invoke('resize', height);
  }
});
