const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  login: { type: String, required: true, minlength: 5, maxlength: 20 },
  password: { type: String, required: true, minlength: 5, maxlength: 100 },
  avatar: { type: String, required: true },
  phone: { type: String, required: true, minlength: 8, maxlength: 20 },
});

module.exports = new mongoose.model('Users', usersSchema);
