import sqlite3 from 'sqlite3';
import md5 from 'md5';

const DBSOURCE = 'db.sqlite';
const sqlite_db = sqlite3.verbose();

const db = new sqlite_db.Database(DBSOURCE, err => {
  if (err) {
    // Cannot open database
    console.error('err.message', err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text,
            type text,
            description text
            )`,
      err => {
        if (err) {
          // Table already created
          console.log('err', err);
        } else {
          // Table just created, creating some rows
          const insert =
            'INSERT INTO task (title, description, type) VALUES (?,?,?)';
          db.run(insert, ['Task 1', 'some description', 'type Artistic']);
          db.run(insert, ['Task 2', 'some description', 'asdw waw d']);
          db.run(insert, ['Task 3', 'some description', 'adsdasd']);
        }
      },
    );
  }
});

export default db;
