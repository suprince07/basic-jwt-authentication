const router = require('express').Router();

router.use('/users', require('../modules/user/user.route'));
router.use('/todos', require('../modules/todo/todo.route'));

module.exports = router;