const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

process.env.NODE_ENV = "production";

let mainWindow;
let addItemWindow;

function onReady() {
  const browserWindowParam = {
    webPreferences: {
      nodeIntegration: true,
    },
  };

  mainWindow = new BrowserWindow(browserWindowParam);

  const mainWindowUrlParams = {
    pathname: path.join(__dirname, "mainWindow.html"),
    protocol: "file:",
    slashes: true,
  };

  mainWindow.on("closed", () => app.quit());

  const mainWindowUrl = url.format(mainWindowUrlParams); //functiuon call arguments
  mainWindow.loadURL(mainWindowUrl); //function call;

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate); //it builds the menu based on the template
  Menu.setApplicationMenu(mainMenu);
}

app.on("ready", onReady);
ipcMain.on("item:add", function (e, item) {
  console.log(item);
  mainWindow.webContents.send("item:add", item);
  addItemWindow.close();
});

function addItem() {
  const browserWindowParam = {
    width: 300,
    height: 200,
    title: "Add Shopping List Item",
    webPreferences: {
      nodeIntegration: true,
    },
  };

  addItemWindow = new BrowserWindow(browserWindowParam);

  const addItemWindowUrlParams = {
    pathname: path.join(__dirname, "addItemWindow.html"),
    protocol: "file:",
    slashes: true,
  };

  //add garbage collection
  addItemWindow.on("close", () => {
    addItemWindow = null;
  });

  const addItemWindowUrl = url.format(addItemWindowUrlParams); //functiuon call arguments
  addItemWindow.loadURL(addItemWindowUrl); //function call;
}

function clearItems() {
  mainWindow.webContents.send("item:clear");
}

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "add item",
        click: addItem,
      },
      {
        label: "clear items",
        click: clearItems,
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click: function () {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({ label: "" });
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
