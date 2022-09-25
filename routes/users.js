const router = require('express').Router();
const {
  getCurrentUser, updateUserInfo,
} = require('../controllers/users');

const {
  userInfoValidate,
} = require('../middlewares/validations');

router.get('/me', getCurrentUser);
router.patch('/me', userInfoValidate, updateUserInfo);

module.exports = router;
