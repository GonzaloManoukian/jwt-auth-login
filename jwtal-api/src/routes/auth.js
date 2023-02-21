const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');

const authController = require('../controllers/authController');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', validateToken, authController.logout);

module.exports = router;