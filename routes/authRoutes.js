const express = require('express');
const router = express.Router();
const { register, login, logout, verifyEmail, resetPassword } = require('../controllers/authController'); // Added verifyEmail and resetPassword

const { registerValidator, loginValidator, validate } = require('../middleware/validators');

router.post('/verify-email', verifyEmail); // Added route for email verification
router.post('/reset-password', resetPassword); // Added route for password reset
router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', logout);

module.exports = router;
