const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo');

router.get('/list', todoController.todoList);
router.post('/add', todoController.addTodo);
router.delete('/delete', todoController.deleteTodo);
router.put('/update', todoController.updateTodo);

module.exports = router;