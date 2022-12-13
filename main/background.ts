import { app } from "electron";
import serve from "electron-serve";
import { ipcMain } from "electron";
import { createWindow } from "./helpers";
import path from "path";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1440,
    height: 1000,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

const db = require("./db/db.ts");

ipcMain.on("enroll-bucket", (evt, payload) => {
  db.insert(payload);
});

ipcMain.handle("get-list", async (evt, payload) => {
  const result: listType = await db.select();
  return result;
});
