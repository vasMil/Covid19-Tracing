const router = require('express').Router();
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');

router.post('/register', register);
router.post('/login', login);


module.exports = router;