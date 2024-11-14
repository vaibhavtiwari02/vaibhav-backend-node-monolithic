const express = require('express');
const { registerUser, resetPassword, login } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

module.exports = router;