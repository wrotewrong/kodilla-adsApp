const Ads = require('../models/ads.model');

exports.getTest = (req, res) => {
  res.send('Ads works');
};

exports.getAll = async (req, res) => {
  try {
    const allAds = await Ads.find();
    if (allAds.length === 0) {
      res.json({ message: 'There are no ads in the database' });
    } else {
      res.json({ allAds });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = (req, res) => {};
exports.getByPhrase = (req, res) => {};

exports.add = async (req, res) => {
  try {
    const date = new Date();
    const newAd = new Ads({
      title: req.body.title,
      text: req.body.text,
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      img: req.body.img,
      price: req.body.price,
      location: req.body.location,
      auth: 'placeholder',
    });
    await newAd.save();
    res.json({ newAd });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = (req, res) => {};
exports.remove = (req, res) => {};
