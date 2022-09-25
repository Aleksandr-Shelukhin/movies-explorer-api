const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const errorCodes = require('../errors/errorsCode');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const AuthorizationError = require('../errors/AuthorizationError');

const login = (req, res, next) => { // авторизация пользователя
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError('Неправильные почта или пароль');
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
          { expiresIn: '7d' },
        );
        res.send({ token });
      });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => { // возвращает информацию о пользователе
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw next(new NotFoundError('Запрашиваеме данные не найдены'));
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => { // создает пользователя
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email }).then((userFound) => {
    if (userFound) {
      throw new ConflictError('Пользователь с таким email уже зарегистрирован');
    }
  });
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send(user.deleteUserPassword()))
    .catch((err) => {
      // eslint-disable-next-line no-underscore-dangle
      if (err.name === 'ValidationError') {
        next(
          new ValidationError(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      } else if (err.code === errorCodes.ConflictError) {
        next(
          new ConflictError('Пользователь с указанным email уже существует'),
        );
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => { // обновляет информацию о пользователе
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Введенеы неверные данные пользователя');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.statusCode === ValidationError || err.name === 'CastError') {
        next(new ValidationError('Введенеы неверные данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  createUser,
  getCurrentUser,
  updateUserInfo,
};
