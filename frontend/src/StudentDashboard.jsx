import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    address: ''
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/students/all');
      const data = await response.json();
      if (response.ok) {
        setStudents(data.students);
      } else {
        console.error(data.error || 'Failed to fetch students');
      }
    } catch {
      console.error('Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/students/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({ firstName: '', lastName: '', dob: '', address: '' });
        setShowAddForm(false);
        fetchStudents();
      } else {
        alert(data.error || 'Failed to add student');
      }
    } catch {
      alert('Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold text-blue-900"
          >
            Student Management
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
          >
            {showAddForm ? 'Close Form' : 'Register New Student'}
          </motion.button>
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl mb-12 border border-blue-50"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">New Registration</h2>
            <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">First Name</label>
                <input 
                  type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Last Name</label>
                <input 
                  type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Date of Birth</label>
                <input 
                  type="date" name="dob" value={formData.dob} onChange={handleInputChange} required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Address</label>
                <input 
                  type="text" name="address" value={formData.address} onChange={handleInputChange} required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-600 transition-all disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-50">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-blue-50/30">
            <h2 className="text-2xl font-bold text-gray-800">Student Directory</h2>
            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-bold">
              {students.length} Total
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-sm uppercase tracking-wider font-bold">
                  <th className="px-8 py-5">Student ID</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">DOB</th>
                  <th className="px-8 py-5">Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.length > 0 ? students.map((s) => (
                  <motion.tr 
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-8 py-6 font-mono text-blue-600">#{String(s.id).padStart(4, '0')}</td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-800">{s.firstName} {s.lastName}</div>
                    </td>
                    <td className="px-8 py-6 text-gray-500">{s.dob}</td>
                    <td className="px-8 py-6 text-gray-500">{s.address}</td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-gray-400 italic">
                      No student records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
