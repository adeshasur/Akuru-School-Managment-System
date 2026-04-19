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
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
            
            {/* --- PREMIUM BACKGROUND EFFECTS --- */}
            {/* Ambient Background Gradient Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
            
            {/* Subtle Grid Overlay for Tech Vibe */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 p-6 md:p-10 max-w-[90rem] mx-auto min-h-screen flex flex-col">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"
                >
                    <div className="space-y-1">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-xs font-medium text-gray-300 tracking-wider">ACADEMIC DOMAIN</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            Student Management
                        </h1>
                        <p className="text-gray-400 text-lg max-w-xl">
                            Oversee active enrollments, manage student profiles, and seamlessly execute grade promotions.
                        </p>
                    </div>

                    <div className="flex space-x-4">
                        <motion.button 
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={handlePromoteClick}
                            className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all backdrop-blur-md border border-white/10 text-sm flex items-center space-x-2 group shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        >
                            <svg className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            <span>Batch Promote</span>
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={handleAddClick}
                            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center space-x-2 border border-blue-400/30 text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            <span>Enroll Student</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Glassmorphism Table Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] shadow-2xl overflow-hidden flex flex-col"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/20">
                                    <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-gray-400">Student ID</th>
                                    <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-gray-400">Name & Details</th>
                                    <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-gray-400">Guardian Contact</th>
                                    <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.05]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-16 text-center text-gray-500 font-medium">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                                                <span>Loading directory...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : students.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                                    <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                                </div>
                                                <p className="text-gray-400 text-lg">No students enrolled yet.</p>
                                                <button onClick={handleAddClick} className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">Add your first student &rarr;</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student, idx) => (
                                        <motion.tr 
                                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 + 0.3 }}
                                            key={student.id} 
                                            className="group hover:bg-white/[0.03] transition-colors duration-300"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="inline-flex px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                                                    STU-{student.id.toString().padStart(4, '0')}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                                                    {student.firstName} {student.lastName}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1 flex items-center space-x-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    <span>Enrolled: {student.enrollmentDate}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                                                    Grade {student.currentGrade}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-sm font-medium text-gray-300">{student.parentName}</div>
                                                <div className="text-sm text-gray-500 mt-0.5">{student.contactNumber}</div>
                                            </td>
                                            <td className="px-8 py-6 text-right space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button onClick={() => handleEditClick(student)} className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition-colors tooltip" title="Edit Profile">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button onClick={() => handleDeleteClick(student.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors tooltip" title="Delete Profile">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
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
