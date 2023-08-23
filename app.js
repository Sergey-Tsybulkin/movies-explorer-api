const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/cors');
const config = require('./config');

const { requestLoggerMiddlewere, errorLoggerMiddlewere } = require('./middlewares/logger');
const rootRouter = require('./routes');

mongoose.set('strictQuery', true);
mongoose.connect(config.DB_URL);

const app = express();

app.use(requestLoggerMiddlewere); // Adding middleware for request logging

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors); // Using CORS

app.use(limiter);

app.use(rootRouter);
app.use(errorLoggerMiddlewere);

app.use(errors());
app.use(errorHandler);

app.listen(config.PORT);
