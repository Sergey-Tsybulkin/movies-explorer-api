const { Router } = require('express');

const router = Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { createMovieValidator, deleteMovieValidator } = require('../validations/moviesValidation');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
