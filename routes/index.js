const router = require('express').Router();

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movieRouter = require('./movies');

const { registrationUser, loginUser } = require('../controllers/auth');
const { signInValidation, signUpValidation } = require('../validations/authValidation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', signUpValidation, registrationUser);
router.post('/signin', signInValidation, loginUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
