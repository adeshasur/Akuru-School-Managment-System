const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
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

// User Login
const loginUser = (req, res) => {
    const { username, password } = req.body;

    // 1. Search for the user in the database by username
    const query = `SELECT * FROM users WHERE username = ?`;
    
    db.get(query, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error." });
        }
        if (!user) {
            return res.status(404).json({ error: "User not found. Incorrect username." });
        }

        // 2. Verify the password matches the hashed version
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // 3. If correct, generate a JWT (token)
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            "super_secret_key_123", // This should be moved to a .env file later
            { expiresIn: '2h' } // Token expires in 2 hours
        );

        res.json({ message: "Login successful!", token: token, role: user.role });
    });
};

module.exports = { registerUser, loginUser };
