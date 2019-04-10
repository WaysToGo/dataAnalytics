const mysql = require("mysql"),
  express = require("express"),
  router = express.Router(),
  app = express(),
  config = {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "zomato"
  },
  cors = require("cors");

app.use(cors());
let connection;

// Wrapper class for MySQL client
// - Constructor creates MySQL connection
// - Connection opened when query is done
// - Promise is resolved when executing
// - Promise returns reject in case of error
// - If promise resolved rows will be the result
class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

// Function that will execute a query
// - In case of an error: ensure connection is always closed
// - In case of succes: return result and close connection afterwards
Database.execute = function(config, callback) {
  const database = new Database(config);
  return callback(database).then(
    result => database.close().then(() => result),
    err =>
      database.close().then(() => {
        throw err;
      })
  );
};

// Instantiate Database
var database = new Database(config);

function getDetails(req, res, query) {
  let genericList;
  Database.execute(config, database =>
    database.query(query).then(rows => {
      genericList = rows;
    })
  )
    .then(() => {
      res.send(JSON.stringify(genericList));
    })
    .catch(err => {
      // handle the error
      res.send(err);
    });
}

// Express routing
app.get("/", function(req, res) {
  res.send("test");
});

// connection.connect(function(err) {
//   if (!err) {
//     console.log("Database is connected");
//   } else {
//     console.log("Error connecting database ");
//   }
// });

app.get("/cities", function(req, res) {
  const query = "select * from cities";
  getDetails(req, res, query);
});
app.get("/users", function(req, res) {
  const query = "select * from users";
  getDetails(req, res, query);
});

app.get("/restaurants", function(req, res) {
  const query = "select * from restaurants";
  getDetails(req, res, query);
});
app.get("/orders", function(req, res) {
  const query = "select * from restaurants";
  getDetails(req, res, query);
});

app.get("/query", function(req, res) {
  const query = req.query.query;
  getDetails(req, res, query);
});

app.get("/core", function(req, res) {
  let operation = null || req.query.operation,
    //any number
    time = null || req.query.time,
    // weekly ,monthly ,yearly, min ,sec etc
    timeBy = null || req.query.timeby,
    compareBy = null || req.query.compareby,
    numberOfWeeks = null || req.query.numberofweeks,
    query = null;

  switch (operation) {
    case "totalorders":
      if (time && timeBy) {
        query = `select count(1)  as orders from orders where order_date > date_sub(now(), interval ${time} ${timeBy})`;
        getDetails(req, res, query);
      }
      break;

    case "weeklycompare":
      if (numberOfWeeks) {
        let weeklyData = "";

        for (let i = 0; i < numberOfWeeks; i++) {
          query = `select count(1)  as orders from orders where order_date = date_sub(now(), interval -${i} week)`;

          Database.execute(config, database =>
            database.query(query).then(rows => {
              weeklyData += rows;
            })
          )
            .then(() => {
              if (i >= numberOfWeeks) {
                res.send(JSON.stringify(genericList));
              }
            })
            .catch(err => {
              // handle the error
              res.send(err);
            });
        }
      }
      break;
    default:
      break;
  }

  if (operation == "compare") {
    if (timeBy && timeBy) {
      query = `(
        SELECT
          "count"(*) as thisweek
        from
          orders
      ) - (
        SELECT
          "count"(*) as lastweek
        from
          orders
          where order_date = date_sub(now(),interval -${time} ${timeBy})
      ) as total_count`;
    }
  }
});

app.listen(5000);

console.log("app is running in port ", 5000);
