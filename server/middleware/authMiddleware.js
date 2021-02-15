const jwt = require('jsonwebtoken')

function authMiddleware (req, res, next) {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({errorMessage: `Unauthorized`})
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified.user //create new property of an object (?)

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = authMiddleware;