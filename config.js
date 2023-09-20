const { config } = require('dotenv');

const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  config();
}

const PORT = 3000;
const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const SOME_SECRET_KEY = 'dev-secret';
const { SIGNING_SECRET_KEY = 'dev-secret' } = process.env;
// const { SOME_SECRET_KEY = 'dev-secret' } = process.env;
const REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  PORT,
  DB_URL,
  SIGNING_SECRET_KEY,
  SOME_SECRET_KEY,
  NODE_ENV,
  REGEX,
};
