const jwt  = require('jsonwebtoken');
const User = require('../models/user');
const Todo = require('../models/todo');

module.exports = {
    authentication: function (req, res, next) {
        try {
            const token = req.headers.token
            if (token) {
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
                req.authenticatedUser = decoded

                if (process.env.NODE_ENV === 'test') {
                    next();
                } else {
                    User
                        .findById(req.authenticatedUser._id)
                        .then(user => {
                            if (user) {
                                next();
                            } else {
                                res
                                    .status(401)
                                    .json({
                                        message: 'Token is not valid'
                                    })
                            }
                        })
                        .catch(err => {
                            res
                                .status(500)
                                .json({
                                    message: err.message
                                })
                        })
                }
            } else {
                res
                    .status(401)
                    .json({
                        message: 'Please login to continue'
                    })
            }
        } catch (err) {
            res
                .status(401)
                .json({
                    message: 'Please login to continue'
                })
        }
    },

    authorization: function(req, res, next) {
        Todo
            .findById(req.params.id)
            .then(todo => {
                if (todo) {
                    if (String(todo.owner) !== req.authenticatedUser._id) {
                        res
                            .status(403)
                            .json({
                                message: 'Forbidden'
                            })
                    } else {
                        next()
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Todo not found'
                        })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: 'Internal Server Error'
                    })
            })
    }
}