import React, { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Welcome back, ${username}! Login successful.` });
        // You could store the token here if needed: localStorage.setItem('token', data.token);
      } else {
        setMessage({ type: 'error', text: data.error || 'Login failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server connection failed. Is the backend running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Left Side: Illustration Section */}
      <div className="hidden md:flex md:w-5/12 items-center justify-center p-12 bg-white relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-md w-full relative"
        >
          <img 
            src="/login_illustration.png" 
            alt="School Management Illustration" 
            className="w-full h-auto object-contain relative z-10"
          />
        </motion.div>
      </div>

      {/* Right Side: Vibrant Blue Login Section */}
      <div className="flex-1 bg-blue-600 relative overflow-hidden flex items-center justify-center p-6 md:p-12 rounded-tl-[20px] md:rounded-tl-[30px] rounded-bl-[20px] md:rounded-bl-[30px]">
        
        {/* Abstract Background Accents (White Curves) */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-white/10 rounded-full" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] border-[2px] border-white/5 rounded-full" />

        {/* Login Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="w-full max-w-sm bg-white rounded-[40px] p-10 md:p-14 shadow-2xl relative z-10"
        >
          <div className="mb-10 text-left">
            <h1 className="text-4xl font-extrabold text-[#1a1a1a] tracking-tight">Hello!</h1>
            <p className="text-gray-400 mt-2 font-medium">Sign Up to Get Started</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Message Display */}
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm font-semibold ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
              >
                {message.text}
              </motion.div>
            )}

            {/* Email/Username Field */}
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg>
              </span>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-gray-700"
                placeholder="Username"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/></svg>
              </span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-gray-700"
                placeholder="Password"
                required
              />
            </div>

            {/* Login Button */}
            <div className="pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-700 text-lg disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </motion.button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center pt-2">
              <a href="#" className="text-sm font-semibold text-gray-400 hover:text-blue-600 transition-colors">Forgot Password</a>
            </div>
          </form>
        </motion.div>
      </div>

    </div>
  );
}

export default App;
