const { app, BrowserWindow, shell, ipcMain, protocol } = require("electron");
const path = require("path");

// Habilitar API de arquivo local para localStorage e IndexedDB funcionar
app.commandLine.appendSwitch("disable-site-isolation-trials");
app.commandLine.appendSwitch("allow-file-access-from-files");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 360,
    minHeight: 600,
    title: "Assistente Jurídico IA",
    backgroundColor: "#0f172a",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,         // permitir localStorage em file://
      allowRunningInsecureContent: false,
    },
    show: false,
  });

  // Carrega o index.html do build
  win.loadFile(path.join(__dirname, "app", "index.html"));

  // Mostrar após carregar (evita flash branco)
  win.once("ready-to-show", () => {
    win.show();
    win.focus();
  });

  // Abrir links externos no navegador padrão
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http")) shell.openExternal(url);
    return { action: "deny" };
  });

  // DevTools apenas em desenvolvimento
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }

  return win;
}

app.whenReady().then(() => {
  // Registrar protocol para servir assets locais
  protocol.registerFileProtocol("app", (request, callback) => {
    const url = request.url.replace("app://", "");
    callback({ path: path.join(__dirname, "app", decodeURI(url)) });
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
