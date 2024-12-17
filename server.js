require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true
}));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.send('Invalid credentials');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Data endpoints
app.get('/getData/:type', (req, res) => {
    const type = req.params.type;
    let query = '';

    switch (type) {
        case 'sales':
            query = 'SELECT Year, Revenue FROM sales';
            break;
        case 'production':
            query = 'SELECT Year, Production_Total FROM production';
            break;
        case 'sales_germany':
            query = 'SELECT Year, Sales_Germany FROM salesamount';
            break;
        case 'sales_abroad':
            query = 'SELECT Year, Sales_Abroad FROM salesamount';
            break;
        case 'production_germany':
            query = 'SELECT Year, Production_Germany FROM production';
            break;
        case 'production_abroad':
            query = 'SELECT Year, Production_Abroad FROM production';
            break;
        default:
            res.json({ success: false, message: 'Invalid data type' });
            return;
    }

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: 'Database error' });
        } else {
            const labels = results.map(row => row.Year);
            const values = results.map(row => Object.values(row)[1]); // Get the second column dynamically
            res.json({ success: true, labels, values });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
