const StudentModel = require('./student.model');

class StudentController {
    // 1. Get all students
    static getAllStudents(req, res) {
        StudentModel.getAllStudents((err, students) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(students);
        });
    }

    // 2. Add a new student
    static createStudent(req, res) {
        StudentModel.createStudent(req.body, (err, newStudentId) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: newStudentId, message: "Student added successfully" });
        });
    }

    // 3. Update an existing student
    static updateStudent(req, res) {
        const studentId = req.params.id;
        StudentModel.updateStudent(studentId, req.body, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ message: "Student not found" });
            res.json({ message: "Student updated successfully" });
        });
    }

    // 4. Delete a student
    static deleteStudent(req, res) {
        const studentId = req.params.id;
        StudentModel.deleteStudent(studentId, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ message: "Student not found" });
            res.json({ message: "Student deleted successfully" });
        });
    }

    // 5. Promote all students (Batch Process)
    static promoteStudents(req, res) {
        StudentModel.promoteAllStudents((err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: `Successfully promoted ${changes} students to the next grade.` });
        });
    }
}

module.exports = StudentController;
