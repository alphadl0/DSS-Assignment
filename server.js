// Import required modules
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
require('dotenv').config(); // Load environment variables from .env file

// Create an instance of the Express app
const app = express();
const port = 3000;

// Setup body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session management
app.use(session({
    secret: process.env.SESSION_SECRET, // Use session secret from .env
    resave: false,
    saveUninitialized: true
}));

// MySQL connection setup using environment variables from .env
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Database host from .env
    user: process.env.DB_USER, // Database user from .env
    password: process.env.DB_PASSWORD, // Database password from .env
    database: process.env.DB_NAME // Database name from .env
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Serve the static files (for the frontend)
app.use(express.static('public'));

// Define the login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple check for username and password
    if (username === 'admin' && password === 'admin') {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Define a route to fetch data based on type (sales, production, expenses)
app.get('/getData/:type', (req, res) => {
    const { type } = req.params;
    let query = '';

    switch (type) {
        case 'sales':
            query = `SELECT Year, Sales_Total AS value FROM salesamount`; // Correct table name
            break;
        case 'production':
            query = `SELECT Year, Production_Total AS value FROM production`;
            break;
        case 'expenses':
            query = `SELECT Year, Gross_profit AS value FROM expenses`;
            break;
        default:
            return res.status(400).send('Invalid data type requested');
    }

    db.query(query, (err, results) => {
        if (err) {
            console.error(`Error fetching ${type} data:`, err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }

        const labels = results.map(row => row.Year);
        const values = results.map(row => row.value);

        res.json({ labels, values });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
