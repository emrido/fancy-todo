const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const todoRoute = require('./todo');
const { authentication } = require('../middlewares/auth');

router.use('/users', userRoute);
router.use('/todos', authentication, todoRoute);

module.exports = router;