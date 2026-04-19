import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const defaultData = {
        firstName: '', lastName: '', dob: '', address: '',
        currentGrade: 1, parentName: '', contactNumber: '', enrollmentDate: new Date().toISOString().split('T')[0]
    };

    const [formData, setFormData] = useState(defaultData);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(defaultData);
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div 
                    className="bg-[#111111]/90 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden w-full max-w-2xl border border-white/10"
                    initial={{ scale: 0.9, y: 30, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 30, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 pointer-events-none" />
                        <h2 className="text-2xl font-bold text-white relative z-10 tracking-tight">
                            {initialData ? 'Edit Student Profile' : 'New Enrollment Form'}
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors relative z-10 bg-white/5 hover:bg-white/10 p-2 rounded-full backdrop-blur-md">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">First Name</label>
                                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all shadow-inner" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Last Name</label>
                                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all shadow-inner" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Date of Birth</label>
                                <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all shadow-inner" style={{ colorScheme: 'dark' }} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Grade Level (1-13)</label>
                                <input required type="number" min="1" max="13" name="currentGrade" value={formData.currentGrade} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all shadow-inner" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Residential Address</label>
                                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all shadow-inner" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Guardian Name</label>
                                <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all shadow-inner" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Emergency Contact</label>
                                <input required type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all shadow-inner" />
                            </div>
                        </div>
                        
                        <div className="pt-6 flex justify-end space-x-4 border-t border-white/10 mt-4">
                            <button type="button" onClick={onClose} className="px-6 py-2.5 text-gray-400 font-medium hover:text-white rounded-xl hover:bg-white/5 transition-colors">
                                Cancel
                            </button>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all border border-blue-500/30"
                            >
                                {initialData ? 'Save Changes' : 'Complete Enrollment'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default StudentFormModal;
