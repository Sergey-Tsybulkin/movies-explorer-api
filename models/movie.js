const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const config = require('../config');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => config.REGEX.test(url),
        message: 'Вам необходимо ввести действительный URL-адрес.',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => config.REGEX.test(url),
        message: 'Вам необходимо ввести действительный URL-адрес',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => config.REGEX.test(url),
        message: 'Вам необходимо ввести действительный URL-адрес',
      },
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
