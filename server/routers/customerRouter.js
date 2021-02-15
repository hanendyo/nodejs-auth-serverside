const router = require('express').Router();

const customerController = require('../controller/customerController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/', authMiddleware, customerController.customer)


module.exports = router;