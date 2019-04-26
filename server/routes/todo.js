const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo');
const { authorization } = require('../middlewares/auth');

router.get('/', todoController.todoList);
router.post('/', todoController.addTodo);
router.delete('/:id', authorization, todoController.deleteTodo);
router.put('/:id', authorization, todoController.updateTodo);

module.exports = router;