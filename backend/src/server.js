const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Load the database connection
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const studentRoutes = require('./routes/studentRoutes'); // Import student management routes

// Initialize Express application
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Main API routes
app.use('/api/auth', authRoutes); // Mount authentication routes to /api/auth
app.use('/api/students', studentRoutes); // Mount student management routes

// Root route for server health check
app.get('/', (req, res) => {
    res.send("School Management System Backend is Running!");
});

// Start the server on Port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
