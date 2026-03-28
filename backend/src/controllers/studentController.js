const db = require('../config/db');

// 1. Register a new student
const addStudent = (req, res) => {
    const { firstName, lastName, dob, address } = req.body;
    
    const query = `INSERT INTO students (firstName, lastName, dob, address) VALUES (?, ?, ?, ?)`;
    
    db.run(query, [firstName, lastName, dob, address], function(err) {
        if (err) {
            return res.status(500).json({ error: "Internal server error." });
        }
        res.status(201).json({ message: "Student registered successfully!", studentId: this.lastID });
    });
};

// 2. Retrieve all student records
const getAllStudents = (req, res) => {
    const query = `SELECT * FROM students`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error." });
        }
        res.json({ students: rows });
    });
};

module.exports = { addStudent, getAllStudents };
