const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const { createMovieValidate, idValidate } = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', createMovieValidate, createMovie);
router.delete('/:id', idValidate, deleteMovie);

module.exports = router;
