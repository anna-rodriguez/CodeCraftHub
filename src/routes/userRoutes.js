const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.registerUser);
// Additional routes (login, getUser, etc.)

module.exports = router;