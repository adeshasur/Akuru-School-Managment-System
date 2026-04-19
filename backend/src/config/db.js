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

        // Create Students table for managing student records
        const createStudentsTable = `
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT,
                lastName TEXT,
                dob TEXT,
                address TEXT,
                currentGrade INTEGER DEFAULT 1,
                parentName TEXT,
                contactNumber TEXT,
                enrollmentDate TEXT
            )
        `;
        
        db.run(createStudentsTable, (err) => {
            if (err) {
                console.error("Students Table error: ", err.message);
            } else {
                console.log("Students table is ready.");
                
                // Add new columns to existing table if they don't exist (poor man's migration for SQLite)
                const newColumns = [
                    "ALTER TABLE students ADD COLUMN currentGrade INTEGER DEFAULT 1",
                    "ALTER TABLE students ADD COLUMN parentName TEXT",
                    "ALTER TABLE students ADD COLUMN contactNumber TEXT",
                    "ALTER TABLE students ADD COLUMN enrollmentDate TEXT"
                ];

                newColumns.forEach(query => {
                    db.run(query, (err) => {
                        // Ignore duplicate column errors
                        if (err && !err.message.includes("duplicate column name")) {
                            // Suppress error or log if not duplicate
                        }
                    });
                });
            }
        });
    }
});

module.exports = db;
