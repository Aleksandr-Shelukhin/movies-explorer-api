const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const ValidationError = require('../errors/ValidationError');

const checkUrl = (url) => {
  const result = validator.isURL(url);
  if (result) {
    return url;
  }
  throw new ValidationError('Веден некорректный URL');
};

const createUserValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userInfoValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const idValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const createMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required().min(2),
    image: Joi.string().required().custom(checkUrl),
    trailerLink: Joi.string(),
    thumbnail: Joi.string().required().custom(checkUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(1),
    nameEN: Joi.string().min(1),
  }),
});

module.exports = {
  createMovieValidate,
  createUserValidate,
  loginValidate,
  userInfoValidate,
  idValidate,
};
