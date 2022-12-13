import path from "path";
const SQLITE = require("better-sqlite3");

let dbPath = path.join(__dirname, "../sqliteDB/bucketlist.db");

const db = new SQLITE(dbPath, SQLITE.OPEN_READWRITE, (err) => {
  if (err) console.log(err.message);
  verbose: console.log;
});
db.pragma("journal_mode = WAL");

const createBucket = db.prepare(
  "CREATE TABLE IF NOT EXISTS BUCKET ( IDX INTEGER PRIMARY KEY, DES TEXT, DATE TEXT )"
);

const createDone = db.prepare(
  "CREATE TABLE IF NOT EXISTS DONE ( IDX INTEGER PRIMARY KEY, DES TEXT, DATE TEXT )"
);

createBucket.run();
createDone.run();

const insert = (arg) => {
  const insert = db.prepare(
    "INSERT INTO BUCKET(DES,DATE) VALUES(?, datetime('now'))"
  );

  insert.run(arg);
};

const select = () => {
  const selectBucket = db.prepare(`SELECT * FROM BUCKET`);
  const selectDone = db.prepare(`SELECT * FROM DONE`);
  const bucketList: bucketListType[] = selectBucket.all();
  const doneList: doneListType[] = selectDone.all();

  const list: listType = {
    bucket: bucketList,
    done: doneList,
  };

  return list;
};

const deleteItem = (id) => {
  console.log(id);
  const deleteList = db.prepare(`DELETE FROM BUCKET WHERE IDX=?`);
  deleteList.run(id);
};

export { insert, select, deleteItem };
