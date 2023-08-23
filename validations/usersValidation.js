const { celebrate, Joi } = require('celebrate');
const config = require('../config');

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = { updateUserValidation };