const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let isConn = false;

let dbPath = path.join(__dirname, "../sqliteDB/bucketlist.db");
console.log(dbPath);

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
  }
});

const insert = function (arg) {
  if (isConn) {
    db.run(
      'INSERT INTO BUCKET(DES,DATE) VALUES(?,datetime("now"))',
      [arg],
      (err) => {
        //console.log(`A row has been inserted with rowid ${this.lastID}`);
        if (err) {
          return console.log(err.message);
        }
      }
    );
    console.log("ok complete");
  }
};

export { insert };
