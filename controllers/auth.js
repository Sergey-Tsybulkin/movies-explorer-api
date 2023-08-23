const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const config = require('../config');


const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.registrationUser = (req, res, next) => {
  const {
    email, password, name
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;
      return res.status(201).send({
        email,
        name,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(
          'Already have user with this datas',
        ));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(
          'User data incorrect',
        ));
      } else {
        next(err);
      }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      const token = jwt.sign({ userId }, config.SOME_SECRET_KEY, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(next);
};
