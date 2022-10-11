const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('./authRouter');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/auth', authRouter);

module.exports = router;