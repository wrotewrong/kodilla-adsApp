const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
  title: { type: String, require: true, minLength: 10, maxLength: 50 },
  text: { type: String, require: true, minLength: 20, maxLength: 1000 },
  date: { type: String, require: true },
  img: { type: String, require: true },
  price: { type: Number, require: true },
  location: { type: String, require: true },
  auth: { type: String, require: true, ref: 'Auth' },
});

module.exports = mongoose.model('Ads', adsSchema);
