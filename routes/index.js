const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { loginValidate, createUserValidate } = require('../middlewares/validations');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginValidate, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', () => {
  throw new NotFoundError('Данные по указанному запросу не существуют');
});

module.exports = router;
