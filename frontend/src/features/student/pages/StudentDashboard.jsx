import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllStudents, createStudent, updateStudent, deleteStudent, promoteStudents } from '../api/studentService';
import StudentFormModal from '../components/StudentFormModal';

const StudentDashboard = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadStudents = async () => {
        setIsLoading(true);
        try {
            const data = await getAllStudents();
            setStudents(data);
        } catch (error) {
            console.error("Error loading students:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleAddClick = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this student's record?")) {
            try {
                await deleteStudent(id);
                loadStudents();
            } catch (error) {
                console.error("Error deleting student:", error);
            }
        }
    };

    const handlePromoteClick = async () => {
        if (window.confirm("This will promote all students to the next grade. Are you sure?")) {
            try {
                await promoteStudents();
                alert("All students promoted successfully!");
                loadStudents();
            } catch (error) {
                console.error("Error promoting students:", error);
            }
        }
    };

    const handleModalSubmit = async (formData) => {
        try {
            if (editingStudent) {
                await updateStudent(editingStudent.id, formData);
            } else {
                await createStudent(formData);
            }
            setIsModalOpen(false);
            loadStudents();
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto bg-gray-50 min-h-screen dark:bg-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Student Management</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage enrollments, profiles, and class promotions.</p>
                </div>
                <div className="flex space-x-3">
                    <motion.button 
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={handlePromoteClick}
                        className="px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg font-medium shadow-sm transition-colors border border-purple-200 dark:border-purple-800"
                    >
                        Batch Promote
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={handleAddClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <span>+</span>
                        <span>Enroll Student</span>
                    </motion.button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                <th className="px-6 py-4 font-semibold">Student ID</th>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Grade</th>
                                <th className="px-6 py-4 font-semibold">Parent / Contact</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-400">Loading students...</td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-400">No students enrolled yet.</td>
                                </tr>
                            ) : (
                                students.map((student, idx) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={student.id} 
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-300">STU-{student.id.toString().padStart(4, '0')}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{student.firstName} {student.lastName}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Enrolled: {student.enrollmentDate}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                Grade {student.currentGrade}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dark:text-white">{student.parentName}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{student.contactNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleEditClick(student)} className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Edit</button>
                                            <button onClick={() => handleDeleteClick(student.id)} className="text-sm text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors">Delete</button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <StudentFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleModalSubmit}
                initialData={editingStudent}
            />
        </div>
    );
};

export default StudentDashboard;
