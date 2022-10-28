const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: { // режиссёр фильма
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: { // длительность фильма
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: { // год выпуска фильма
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: { // описание фильма
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неподходящий формат ссылки',
    },
  },
  trailerLink: { // ссылка на трейлер фильма
    type: String,
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неподходящий формат ссылки',
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  nameEN: { // название фильма на английском языке
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
