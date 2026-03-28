const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// API endpoint for user registration: POST http://localhost:5000/api/auth/register
router.post('/register', registerUser);

module.exports = router;
