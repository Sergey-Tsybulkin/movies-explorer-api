const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const config = require('../config');

const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const registrationUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('User with this email address is already registered'));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Incorrect data was sent during user registration',
          ),
        );
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.SOME_SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = { registrationUser, loginUser };
