const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
//const {getUser} = require('./controllers/getUserController');


// router.post('/register', [
//     body('username',"The username must be of minimum 3 characters length")
//     .notEmpty()
//     .escape()
//     .trim()
//     .isLength({ min: 3 }),
//     body('email',"Invalid email address")
//     .notEmpty()
//     .escape()
//     .trim().isEmail(),
//     body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
// ], register);

router.post('/register', [
    body('username').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty()
], register);


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

//router.get('/getuser',getUser);

module.exports = router;