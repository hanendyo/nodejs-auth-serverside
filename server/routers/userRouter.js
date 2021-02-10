const router = require('express').Router();

// controller components
const userController = require('../controller/userController')

// register
router.post('/register', userController.userRegister);

// login
router.post('/login', userController.userLogin);

// logout
router.get('/logout', userController.userLogout);

module.exports = router;