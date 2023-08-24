const { ValidationError } = require('mongoose').Error;
// const { CastError } = require('mongoose').Error;
const User = require('../models/user');

const NotFound = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequestError');

module.exports.getUserId = (req, res, next) => {
  const userId = req.user._id;
  User.findUserById(userId)
    .orFail(() => {
      throw new NotFound('User by specified _id not found');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((event) => {
      if (event.name === 'CastError') {
        next(new BadRequest('The requested user was not found'));
      } else {
        next(event);
      }
    });
};

const updateUserProfileData = (userId, data) => User.findByIdAndUpdate(userId, data, {
  new: true,
  runValidators: true,
}).then((user) => {
  if (user) {
    return user;
  }
  throw new NotFound('User with specified _id not found');
}).catch((err) => {
  if (err instanceof ValidationError) {
    throw new BadRequest('Incorrect data sent when updating information');
  }
  throw err;
});

module.exports.updateUserProfile = (req, res, next) => {
  const { email, name } = req.body;
  const { userId } = req.user;

  updateUserProfileData(userId, { email, name })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
