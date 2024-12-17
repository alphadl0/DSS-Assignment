require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.message);
    } else {
        console.log('Connected to the database.');
    }
});

// API to fetch generic data
app.get('/getData/:type', (req, res) => {
    const { type } = req.params;

    let query = '';
    switch (type) {
        case 'salesamount':
            query = 'SELECT year, sales_total AS value FROM salesamount';
            break;
        case 'sales_germany':
            query = 'SELECT year, sales_germany AS value FROM salesamount';
            break;
        case 'sales_abroad':
            query = 'SELECT year, sales_abroad AS value FROM salesamount';
            break;
        case 'production_total':
            query = 'SELECT year, production_total AS value FROM production';
            break;
        case 'production_germany':
            query = 'SELECT year, production_germany AS value FROM production';
            break;
        case 'production_abroad':
            query = 'SELECT year, production_abroad AS value FROM production';
            break;
        case 'revenueCosts':
            query = 'SELECT year, revenue, costs FROM sales';
            break;
        default:
            return res.status(400).json({ error: 'Invalid type' });
    }

    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Database query error' });
        } else {
            res.json(results);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
