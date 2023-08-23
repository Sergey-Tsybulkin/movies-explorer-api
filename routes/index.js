const router = require('express').Router();
const auth = require('../middlewares/auth');
const signInRouter = require('./signin');
const signUpRouter = require('./signup');
const usersRouter = require('./user');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

// Routes for Authentication
router.use('/', signInRouter);
router.use('/', signUpRouter);

router.use(auth);

// Routes for user
router.use('/user', usersRouter);

// Routes for movies
router.use('/movies', cardsRouter);

// Handling non-existent routes
router.use((req, res, next) => next(new NotFoundError('The page at the requested URL does not exist')));

module.exports = router;
