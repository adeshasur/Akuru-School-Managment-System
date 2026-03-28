const express = require('express');
const router = express.Router();
const { addStudent, getAllStudents } = require('../controllers/studentController');

// Route to add a new student: POST http://localhost:5000/api/students/add
router.post('/add', addStudent);

// Route to get all students: GET http://localhost:5000/api/students/all
router.get('/all', getAllStudents);

module.exports = router;
