const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Нужно обязательно указать имя'],
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неподходящий формат email',
    },
    unique: true,
    required: [true, 'Не указан email'],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Не указан пароль'],
  },
});

function deleteUserPassword() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.deleteUserPassword = deleteUserPassword;

module.exports = mongoose.model('user', userSchema);
