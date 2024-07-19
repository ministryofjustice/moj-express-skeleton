import sqlite3 from 'sqlite3';
sqlite3.verbose();

/**
 * Sets up the database.
 * Using in-memory database for simplicity. Use a file path for persistent storage.
 */
const db = new sqlite3.Database(':memory:'); // Change ':memory:' to a file path for persistent storage

// Initialize your database schema here, for example:
// db.serialize(() => {
//     db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
//     db.run("INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')");
//     db.run("INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane@example.com')");
// });

export default db;