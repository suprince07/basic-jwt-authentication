const router = require('express').Router();
const UserController = require('./user.controller');
const AuthController = require('../auth/auth.controller');

router.get('/', UserController.index);
router.put('/:id', UserController.edit);
router.get('/logout', AuthController.logout);

module.exports = router;