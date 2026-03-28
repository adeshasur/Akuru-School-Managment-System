const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Registration API endpoint: http://localhost:5000/api/auth/register
router.post('/register', registerUser);

// Login API endpoint: http://localhost:5000/api/auth/login
router.post('/login', loginUser);

module.exports = router;
