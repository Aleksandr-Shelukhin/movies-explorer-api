require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { devDatabaseUrl } = require('./utils/config');

const routes = require('./routes/index');
const error = require('./middlewares/error');

const { NODE_ENV, DATABASE_URL } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3010',
    'http://alex-shelukhin-movies.nomorepartiesxyz.ru',
    'https://alex-shelukhin-movies.nomorepartiesxyz.ru',
    'https://github.com/Aleksandr-Shelukhin',
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
mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : devDatabaseUrl);

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
