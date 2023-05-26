const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  database: "api-task",
  user: "root",
  password: "12345678",
});

let database = pool.promise();

module.exports = database;
