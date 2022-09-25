// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');

const routes = require('./routes/index');
const error = require('./middlewares/error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const options = {
  origin: [
    'https://localhost:3010',
    'http://localhost:3010',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use(cors(options));

app.use(cookieParser());
app.use(express.json());

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mymoviesdb');

// middleware
app.use(requestLogger); // подключаем логгер запросов
app.use(helmet()); // защита заголовков
app.use(limiter); // ограничитель запросов

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // celebrate
app.use(error); // централизованный

app.listen(PORT, () => {
  console.log(`Запущено через порт ${PORT}`);
});