import path from "path";
const SQLITE = require("better-sqlite3");

let dbPath = path.join(__dirname, "./bucketlist.db");
dbPath = "C://database/bucketlist.db";

const db = new SQLITE(dbPath, SQLITE.OPEN_READWRITE, (err) => {
  if (err) console.log(err.message);
  verbose: console.log;
});
db.pragma("journal_mode = WAL");

const createBucket = db.prepare(
  `CREATE TABLE 
  IF NOT EXISTS BUCKET ( 
    IDX INTEGER PRIMARY KEY AUTOINCREMENT, 
    DES TEXT, 
    DATE TEXT, 
    DONE INTEGER DEFAULT 0
  )`
);

const createDetail = db.prepare(
  `CREATE TABLE 
  IF NOT EXISTS DETAIL( 
    IDX INTEGER PRIMARY KEY AUTOINCREMENT, 
    FID INTEGER, 
    DES TEXT,
    UNIQUE(FID),
    CONSTRAINT foreign_key
      FOREIGN KEY(FID) 
      REFERENCES BUCKET(IDX)
      ON DELETE CASCADE
  )`
);

createBucket.run();
createDetail.run();

const insertBucket = (des) => {
  const insert = db.prepare(
    "INSERT INTO BUCKET(DES,DATE) VALUES(?, datetime('now'))"
  );

  insert.run(des);
};

const insertDone = (idx, des, date) => {
  const insert = db.prepare("INSERT INTO DONE(IDX, DES,DATE) VALUES(?, ?, ?)");

  insert.run([idx, des, date]);
};

const insertDetail = (fid, des) => {
  const insert = db.prepare("INSERT INTO DETAIL(FID, DES) VALUES(?, ?)");

  insert.run([fid, des]);
};

const selectBucket = (id) => {
  const insert = db.prepare("SELECT * FROM BUCKET WHERE IDX=?");

  const result = insert.get(id);
  return result;
};

const selectDone = (id) => {
  const insert = db.prepare("SELECT * FROM DONE WHERE IDX=?");

  const result = insert.get(id);
  return result;
};

const selectDetail = (id) => {
  const insert = db.prepare("SELECT * FROM DETAIL WHERE FID=?");

  const result = insert.get(id);
  return result;
};

const selectAll = () => {
  const selectBucket = db.prepare(`SELECT * FROM BUCKET WHERE DONE=0`);
  const selectDone = db.prepare(`SELECT * FROM BUCKET WHERE DONE=1`);
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
  deleteBucket(id);
  insertDone(item.IDX, item.DES, item.DATE);
};

const executeQuery = (query: queryType) => {
  const prepared = db.prepare(query.sql);
  if (query.sql.includes("SELECT")) {
    return prepared.get(query.value);
  } else {
    prepared.run(query.value);
    return selectAll();
  }
};

const executeQueries = (queries: queryType[]) => {
  const transaction = db.transaction((queries) => {
    for (const query of queries) executeQuery(query);
  });
  transaction();
};

export {
  insertBucket,
  insertDone,
  insertDetail,
  selectAll,
  deleteBucket,
  deleteDone,
  selectBucket,
  selectDone,
  selectDetail,
  move,
  executeQuery,
  executeQueries,
};
