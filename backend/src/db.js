const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: db_host,
  user: db_user,
  password: db_pass,
  database: db_name,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;