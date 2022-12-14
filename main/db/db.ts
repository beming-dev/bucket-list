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

const insertBucket = (des) => {
  const insert = db.prepare(
    "INSERT INTO BUCKET(DES,DATE) VALUES(?, datetime('now'))"
  );

  insert.run(des);
};

const insertDone = (des, date) => {
  const insert = db.prepare("INSERT INTO DONE(DES,DATE) VALUES(?, ?)");

  insert.run([des, date]);
};

const selectBucket = (id) => {
  const insert = db.prepare("SELECT * FROM BUCKET WHERE IDX=?");

  const result = insert.get(id);
  return result;
};

const selectAll = () => {
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

const deleteBucket = (id) => {
  const deleteList = db.prepare(`DELETE FROM BUCKET WHERE IDX=?`);
  deleteList.run(id);
};
const deleteDone = (id) => {
  const deleteList = db.prepare(`DELETE FROM DONE WHERE IDX=?`);
  deleteList.run(id);
};

const move = (id) => {
  const item: bucketListType = selectBucket(id);
  console.log(item);
  deleteBucket(id);
  insertDone(item.DES, item.DATE);
};

export {
  insertBucket,
  insertDone,
  selectAll,
  deleteBucket,
  deleteDone,
  selectBucket,
  move,
};
