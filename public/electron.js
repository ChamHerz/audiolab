// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, MenuItem } = require("electron");
const path = require("path");

const isDev = require("electron-is-dev");
const isMac = process.platform === "darwin";
let mainWindow;

const menuTemplate = [
  {
    label: "Archivo",
    submenu: [
      {
        label: "Agregar producto",
        click() {
          onCreateFileMenu();
        },
      },
      {
        label: "Eliminar productos",
        click() {
          mainWindow.webContents.send("productos:eliminar");
        },
      },
      {
        label: "Salir",
        accelerator: isMac ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

function onCreateFileMenu() {}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    title: "AudioLab",
    webPreferences: {
      webSecurity: false,
    },
  });

  /*const mainMenu = Menu.buildFromTemplate(menuTemplate);
  mainWindow.setMenu(mainMenu);*/

  /*const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: "Hola",
      click: function () {
        console.log("context menu");
      },
    })
  );*/

  /*mainWindow.webContents.on("context-menu", function (e, params) {
    contextMenu.popup(mainWindow, params.x, params.y);
  });*/

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    // Using require
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => {
        console.log(`Added Extension:  ${name}`);
      })
      .catch((err) => {
        console.log("Error ocurrido: ", err);
      });
  }
  // Open the DevTools.
  mainWindow.webContents.once("dom-ready", () => {
    const server = require("../src/server");
    mainWindow.webContents.openDevTools();
  });
}

app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  console.log("Saliendo");
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
