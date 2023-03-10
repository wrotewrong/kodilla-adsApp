const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/testAuth', authController.getTest);
router.get('/user', authController.getUser);
router.get('/register', authController.register);
router.get('/login', authController.login);

module.exports = router;
