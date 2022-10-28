const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => { // возвращает все сохранённые текущим пользователем фильмы
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => { // создаёт фильм с переданными в теле
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (
        err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные для создания карточки'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => { // удаляет сохранённый фильм по id
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Карточки с таким id не существует');
    })
    .then((movie) => {
      const movieOwner = movie.owner.toString().replace('new ObjectId("', '');
      if (movieOwner !== req.user._id) {
        next(new ForbiddenError('Можно удалять только свои карточки'));
      } else {
        Movie.findByIdAndRemove(req.params.id)
          .then((removedMovie) => res.send(removedMovie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new ValidationError(
            'Переданы некорректные данные для удаления карточки',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
