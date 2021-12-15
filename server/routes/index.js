const router = require('express').Router();
const userRouter = require('./user');
const bookRouter = require('./book');

router.use('/user', userRouter);
router.use('/book', bookRouter);

module.exports = router;
