const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');

router.post('/sign_up', [
        check("username", "Username can't be empty!").notEmpty(),
        check('password', "Password length must be between 4 and 20 symbols!").isLength({min: 4, max: 20})
    ],
    authController.signUp);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;