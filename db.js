// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sadia@com1234',
  database: 'university_events'
});

module.exports = pool;
