const router = require('express').Router();
const AuthController = require('./auth.controller');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;