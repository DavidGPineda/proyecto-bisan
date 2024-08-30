const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'proyecto_bisan',
  password: 'D7711avidPineda'
});

module.exports = pool;
