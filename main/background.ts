import { app } from "electron";
import serve from "electron-serve";
import { ipcMain } from "electron";
import { createWindow } from "./helpers";

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

const getList = async () => {
  const result: listType = await db.selectAll();
  console.log(result);
  return result;
};

ipcMain.handle("enroll-bucket", async (evt, des) => {
  await db.insertBucket(des);
  return getList();
});

ipcMain.handle("send-bucket", async (evt, id) => {
  await db.move(id);

  return getList();
});

ipcMain.handle("delete-bucket", async (evt, payload) => {
  await db.deleteBucket(payload);
  return getList();
});

ipcMain.handle("delete-done", async (evt, payload) => {
  await db.deleteDone(payload);
  return getList();
});

ipcMain.handle("get-list", async (evt, payload) => {
  return getList();
});
