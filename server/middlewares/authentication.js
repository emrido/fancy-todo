const jwt = require('jsonwebtoken')

module.exports = {
    authentication: function (req, res, next) {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            req.authenticatedUser = decoded
            next()
        } catch (err) {
            res.status(401).json({ 
                message: 'Login first'
            })
        }
    }
}