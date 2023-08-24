const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

// Routes for Authentication
router.use('/', require('./signin'));
router.use('/', require('./signup'));

router.use(auth);

// Routes for user
router.use('/users', require('./users'));

// Routes for movies
router.use('/movies', require('./movies'));

// Handling non-existent routes
router.use((req, res, next) => next(new NotFoundError('The page at the requested URL does not exist')));

module.exports = router;
