const mongoose = require('mongoose');
const { TITLE_MIN_LENGTH } = require('../config');
const { TITLE_MAX_LENGTH } = require('../config');
const { TEXT_MIN_LENGTH } = require('../config');
const { TEXT_MAX_LENGTH } = require('../config');

const adsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: TITLE_MIN_LENGTH,
    maxlength: TITLE_MAX_LENGTH,
  },
  text: {
    type: String,
    required: true,
    minlength: TEXT_MIN_LENGTH,
    maxlength: TEXT_MAX_LENGTH,
  },
  date: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  user: { type: String, required: true, ref: 'Users' },
});

module.exports = mongoose.model('Ads', adsSchema);
