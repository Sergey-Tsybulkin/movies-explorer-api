const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { SOME_SECRET_KEY } = require('../config');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  const errorMsg = 'Wrong email or password';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError(`${errorMsg})`));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : SOME_SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(`${errorMsg}`));
  }
  req.user = payload;
  return next();
};
