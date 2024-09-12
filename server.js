const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());

// Initialize SQLite database
let db = new sqlite3.Database('./scores.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the scores database.');
});

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS scores(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    score INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// API endpoint to save score
app.post('/scores', (req, res) => {
    const { name, score } = req.body;
    db.run(`INSERT INTO scores(name, score) VALUES(?, ?)`, [name, score], function (err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ id: this.lastID });
    });
});

// API endpoint to get top scores
app.get('/scores', (req, res) => {
    db.all(`SELECT name, score FROM scores ORDER BY score DESC LIMIT 10`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
