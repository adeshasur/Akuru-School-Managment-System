const express = require('express');
const cors = require('cors');

// Initialize Express application
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Root route for server health check
app.get('/', (req, res) => {
    res.send("School Management System Backend is Running!");
});

// Start the server on Port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
