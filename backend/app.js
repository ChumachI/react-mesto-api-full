// eslint-disable-next-line import/newline-after-import
require('dotenv').config();
const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
const allowedCors = [
  'https://mesto.ilya.chumak.nomoredomains.xyz',
  'http://mesto.ilya.chumak.nomoredomains.xyz',
  'http://localhost:3000',
];
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
