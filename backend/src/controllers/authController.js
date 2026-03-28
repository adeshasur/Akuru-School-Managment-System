const db = require('../config/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    // Extract user details from the request body
    const { username, password, role } = req.body;

    try {
        // Hash the password for security (using a salt cost of 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert a new user into the database
        const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
        
        db.run(query, [username, hashedPassword, role], function(err) {
            if (err) {
                // Return an error if the username exists or another issue occurs
                return res.status(400).json({ error: "Username already exists or a database error occurred." });
            }
            // Successful registration response
            res.status(201).json({ message: "User registered successfully!", userId: this.lastID });
        });
    } catch (error) {
        // General server error handling
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { registerUser };
