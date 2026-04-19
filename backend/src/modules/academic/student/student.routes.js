const express = require('express');
const router = express.Router();
const StudentController = require('./student.controller');

// GET all students
router.get('/', StudentController.getAllStudents);

// POST new student
router.post('/', StudentController.createStudent);

// PUT update existing student
router.put('/:id', StudentController.updateStudent);

// DELETE student
router.delete('/:id', StudentController.deleteStudent);

// POST batch promote students
router.post('/promote', StudentController.promoteStudents);

module.exports = router;
