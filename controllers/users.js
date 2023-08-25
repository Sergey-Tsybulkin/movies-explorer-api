const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const getUserId = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId).orFail(() => {
    throw new NotFoundError('Пользователь с указанным идентификатором не найден');
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь по указанному запросу не найден'));
      } else {
        next(err);
      }
    });
};

const updateUserProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  ).orFail(() => {
    throw new NotFoundError('Пользователь с указанным идентификатором не найден');
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Это пользователь уже существует'));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'При обновлении информации отправлены неверные данные',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = { getUserId, updateUserProfile };
