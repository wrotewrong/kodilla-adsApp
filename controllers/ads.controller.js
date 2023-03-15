const Ads = require('../models/ads.model');
const User = require('../models/users.model');
const getImageFileType = require('../utils/getImageFileType');
const removeImage = require('../utils/removeImage');

exports.getAll = async (req, res) => {
  try {
    const allAds = await Ads.find().populate({
      path: 'user',
      select: '-password',
    });
    if (allAds.length === 0) {
      res.status(200).json({ message: 'There are no ads in the database' });
    } else {
      res.status(200).json(allAds);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const adById = await Ads.findById(req.params.id).populate({
      path: 'user',
      select: '-password',
    });
    if (!adById) {
      res.status(400).json({ message: 'Not found...' });
    } else {
      res.status(200).json(adById);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByPhrase = async (req, res) => {
  try {
    const searchAd = await Ads.find({
      title: { $regex: req.params.searchPhrase, $options: 'i' },
    }).populate({
      path: 'user',
      select: '-password',
    });
    if (!searchAd) {
      res.status(400).json({ message: 'Not found...' });
    } else {
      res.status(200).json(searchAd);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { title, text, price, location } = req.body;
    const img = req.file;
    const fileType = img ? await getImageFileType(img) : 'unknown';
    const validExtensions = ['image/gif', 'image/jpg', 'image/png'];
    const date = new Date();
    const formatDate = `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;

    if (
      title &&
      text &&
      img &&
      price &&
      location &&
      validExtensions.includes(fileType)
    ) {
      const newAd = new Ads({
        title,
        text,
        date: formatDate,
        img: img.filename,
        price,
        location,
        user: await User.findById(req.session.user.id).populate('user'),
      });
      await newAd.save();
      res.status(201).json({ message: 'Ad created', newAd });
    } else {
      removeImage(img.filename);
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.edit = (req, res) => {};

exports.remove = async (req, res) => {
  try {
    const deleteAd = await Ads.findById(req.params.id).populate({
      path: 'user',
      select: '-password',
    });

    if (!deleteAd) {
      res.status(400).json({ message: 'Not found...' });
    } else {
      if (req.session.user.id !== String(deleteAd.user._id)) {
        res.status(400).json({ message: 'You can only delete your own ads' });
      } else {
        removeImage(deleteAd.img);
        await deleteAd.remove();
        res.status(200).json({ message: 'Ad deleted', deleteAd });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
