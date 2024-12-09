const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.redirect('/dashboard');
  } else {
    res.send('Login failed');
  }
});

app.get('/dashboard', (req, res) => {
  const query = 'SELECT * FROM country';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.send('Error fetching data');
      return;
    }
    res.render('dashboard', { data: results });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});