const db = require('../../../config/db');

class StudentModel {
    // 1. Get all students
    static getAllStudents(callback) {
        db.all("SELECT * FROM students", [], (err, rows) => {
            callback(err, rows);
        });
    }

    // 2. Add a new student
    static createStudent(studentData, callback) {
        const { firstName, lastName, dob, address, currentGrade, parentName, contactNumber, enrollmentDate } = studentData;
        const query = `
            INSERT INTO students (firstName, lastName, dob, address, currentGrade, parentName, contactNumber, enrollmentDate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.run(query, [firstName, lastName, dob, address, currentGrade, parentName, contactNumber, enrollmentDate], function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    // 3. Update a student
    static updateStudent(id, studentData, callback) {
        const { firstName, lastName, dob, address, currentGrade, parentName, contactNumber, enrollmentDate } = studentData;
        const query = `
            UPDATE students
            SET firstName = ?, lastName = ?, dob = ?, address = ?, currentGrade = ?, parentName = ?, contactNumber = ?, enrollmentDate = ?
            WHERE id = ?
        `;
        db.run(query, [firstName, lastName, dob, address, currentGrade, parentName, contactNumber, enrollmentDate, id], function (err) {
            callback(err, this ? this.changes : 0);
        });
    }

    // 4. Delete a student
    static deleteStudent(id, callback) {
        const query = "DELETE FROM students WHERE id = ?";
        db.run(query, [id], function (err) {
            callback(err, this ? this.changes : 0);
        });
    }

    // 5. Batch process: Promote all students to the next grade
    static promoteAllStudents(callback) {
        const query = "UPDATE students SET currentGrade = currentGrade + 1";
        db.run(query, [], function (err) {
            callback(err, this ? this.changes : 0);
        });
    }
}

module.exports = StudentModel;
