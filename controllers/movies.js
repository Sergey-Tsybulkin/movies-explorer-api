const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequestError');
const Forbidden = require('../errors/ForbiddenError');
const NotFound = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(new NotFound('Movie with specified id not found'))
    .then((movies) => res.send({ movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({ movie }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new Forbidden('Movie cannot be deleted');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Invalid deletion data sent'));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
