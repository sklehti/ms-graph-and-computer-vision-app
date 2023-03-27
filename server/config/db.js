require("dotenv").config();

const mysql = require("mysql");

let db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect(function (err) {
  if (err) throw err;

  console.log("Connected!");
});

module.exports = db;
