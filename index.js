const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  db.query('SELECT NOW() AS time', (err, results) => {
    if (err) {
      return res.status(500).send('Database query failed');
    }
    res.send(`Current time from DB Manoj RSR: ${results[0].time}`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
