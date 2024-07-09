const sqlite3 = require('sqlite3').verbose();

// Set up the database
const db = new sqlite3.Database(':memory:'); // Using in-memory database for simplicity, use a file path for persistent storage

// Initialize your database schema in here.


module.exports = db;