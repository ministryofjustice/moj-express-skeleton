const sqlite3 = require('sqlite3').verbose();

// Set up the database
const db = new sqlite3.Database(':memory:'); // Using in-memory database for simplicity, use a file path for persistent storage

// Initialize the database schema
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
    db.run("INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')");
    db.run("INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane@example.com')");
});


module.exports = db;