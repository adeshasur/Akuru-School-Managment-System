const sqlite3 = require('sqlite3').verbose();

// Connect to the database (school_system.db file will be created automatically)
const db = new sqlite3.Database('./school_system.db', (err) => {
    if (err) {
        console.error("Database Error: ", err.message);
    } else {
        console.log("Connected to the SQLite database.");
        
        // Create Users table for system logins
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                role TEXT
            )
        `;
        
        db.run(createUsersTable, (err) => {
            if (err) {
                console.error("Table creation error: ", err.message);
            } else {
                console.log("Users table is ready.");
            }
        });
    }
});

module.exports = db;
