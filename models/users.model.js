const mongoose = require('mongoose');
const { LOGIN_MIN_LENGTH } = require('../backendConfig');
const { LOGIN_MAX_LENGTH } = require('../backendConfig');
const { PHONE_MIN_LENGTH } = require('../backendConfig');
const { PHONE_MAX_LENGTH } = require('../backendConfig');

const usersSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: LOGIN_MIN_LENGTH,
    maxlength: LOGIN_MAX_LENGTH,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    minlength: PHONE_MIN_LENGTH,
    maxlength: PHONE_MAX_LENGTH,
  },
});

module.exports = new mongoose.model('Users', usersSchema);
