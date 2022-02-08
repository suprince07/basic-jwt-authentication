const router = require('express').Router();
const TodoController = require('./todo.controller');

router.get('/', TodoController.index);
router.post('/', TodoController.create);
router.put('/:id', TodoController.edit);
router.delete('/:id', TodoController.destroy);

module.exports = router;