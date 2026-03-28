const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./school_system.db');

async function createUser() {
    const username = 'admin';
    const password = 'password123';
    const role = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
    db.run(query, [username, hashedPassword, role], function(err) {
        if (err) {
            console.error("Error creating user:", err.message);
        } else {
            console.log("User created successfully with ID:", this.lastID);
        }
        db.close();
    });
}

createUser();
