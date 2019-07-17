import SQLite from 'react-native-sqlite-storage'

SQLite.DEBUG(true)
SQLite.enablePromise(true)

const database_name = 'media_keuangan.db'
const database_version = '1.0'
const database_displayname = 'Media Keuangan Database'
const database_size = 200000

export default class Database {
  initDB () {
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              db.executeSql('SELECT 1 FROM Magazine LIMIT 1').then(() => {
                console.log("Database is ready ... executing query ...");
              }).catch((error) =>{
                console.log("Received error: ", error);
                console.log("Database not yet ready ... populating data");
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS Magazine (id integer PRIMARY KEY, title , main_image, author DEFAULT "", content, isLoved)');
                }).then(() => {
                  console.log("Table created successfully");
                }).catch(error => {
                  console.log(error);
                });
              });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
      });
  }

  closeDatabase (db) {
    if (db) {
      console.log("Closing DB")
      db.close()
        .then((status) => {
          console.log("Database CLOSED")
        })
        .catch((error) => {
          this.errorCB(error)
        })
    } else {
      console.log("Database was not OPENED")
    }
  }

  listMagazine () {
    return new Promise((resolve) => {
      const magazine = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Magazine', []).then(([tx,results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { id, title, main_image, author, content, isLoved } = row;
              magazine.push({
                id,
                title,
                main_image,
                author,
                content,
                isLoved
              });
            }
            console.log(magazine);
            resolve(magazine);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  listFavoriteMagazine (isLoved) {
    return new Promise((resolve) => {
      const magazine = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Magazine WHERE isLoved = ?', [isLoved]).then(([tx,results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { id, title, main_image, author, content, isLoved } = row;
              magazine.push({
                id,
                title,
                main_image,
                author,
                content,
                isLoved
              });
            }
            console.log(magazine);
            resolve(magazine);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  magazinesById (id) {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Magazine WHERE id = ?', [id])
              .then(([tx, results]) => {
                console.log(results)
                if (results.rows.length > 0) {
                  const row = results.rows.item(0)
                  resolve(row)
                }
              })
          })
          .then((result) => {
            this.closeDatabase(db)
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  addMagazine (magazine) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO Magazine VALUES (?, ?, ?, ?, ?, ?)', [magazine.id, magazine.title, magazine.main_image, magazine.author, magazine.content, magazine.isLoved]).then(([tx, results]) => {
            resolve(results)
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err)
        });
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  updateMagazine (magazine) {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('INSERT OR REPLACE INTO Magazine (id, title, main_image, author, content, isLoved) VALUES (?, ?, ?, ?, ?, ?)', [magazine.id, magazine.title, magazine.main_image, magazine.author, magazine.content, magazine.isLoved])
              .then(([tx, results]) => {
                resolve(results)
              })
          })
          .then((result) => {
            this.closeDatabase(db)
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  deleteMagazine (id) {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM Magazine WHERE id = ?', [id])
              .then(([tx, results]) => {
                resolve(results)
              })
          })
          .then((result) => {
            this.closeDatabase(db)
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  resetDB () {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DROP TABLE Magazine', [])
              .then(([tx, results]) => {
                resolve(results)
              })
          })
          .then((result) => {
            this.closeDatabase(db)
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
}