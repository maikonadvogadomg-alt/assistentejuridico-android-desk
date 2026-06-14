const { contextBridge } = require("electron");
// Expõe versão do app para o renderer se necessário
contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,
  version: process.versions.electron,
});
