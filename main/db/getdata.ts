const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let isConn = false;

let dbPath = path.join(__dirname, "../sqliteDB/bucketlist.db");

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the DB database");
    isConn = true;
    db.run(
      "CREATE TABLE IF NOT EXISTS BUCKET ( IDX INTEGER PRIMARY KEY, DES TEXT, DATE TEXT )",
      [],
      (arg) => {
        console.log("create", arg);
      }
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS DONE ( IDX INTEGER PRIMARY KEY, DES TEXT, DATE TEXT )",
      [],
      (arg) => {
        console.log("create", arg);
      }
    );
  }
});

const insert = async function (arg) {
  if (isConn) {
    await db.run(
      'INSERT INTO BUCKET(DES,DATE) VALUES(?,datetime("now"))',
      [arg],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
      }
    );
  }
};

const select = async function (table) {
  const list = {
    bucket: [],
    done: [],
  };
  if (isConn) {
    await db.all(`SELECT * FROM BUCKET`, [], (err, rows) => {
      if (err) {
        return console.log(err.message);
      }
      rows.forEach((row) => {
        list.bucket.push(row);
      });
    });
    await db.all(`SELECT * FROM DONE`, [], (err, rows) => {
      if (err) {
        return console.log(err.message);
      }
      rows.forEach((row) => {
        list.done.push(row);
      });
    });
    return list;
  }
};

export { insert, select };
