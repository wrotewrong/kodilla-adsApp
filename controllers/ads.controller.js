const Ads = require('../models/ads.model');
const User = require('../models/users.model');
const getImageFileType = require('../utils/getImageFileType');
const removeImage = require('../utils/removeImage');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

exports.getAll = async (req, res) => {
  try {
    const allAds = await Ads.find().populate({
      path: 'user',
      select: '-password',
    });
    if (allAds.length === 0) {
      logger.info('No ads in the database');
      res.status(200).json({ message: 'There are no ads in the database' });
    } else {
      logger.info('Retrived all ads');
      res.status(200).json(allAds);
    }
  } catch (err) {
    logger.error(`Error occurred: ${err.message}`);
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
      logger.warn(`The ad with id: ${req.params.id} does not exist`);
      res.status(400).json({ message: 'Not found...' });
    } else {
      logger.info(`Retrived ad with id ${req.params.id}`);
      res.status(200).json([adById]);
    }
  } catch (err) {
    logger.error(`Error occurred: ${err.message}`);
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
    if (searchAd.length === 0) {
      logger.warn(
        `There are no ads containing phrase: ${req.params.searchPhrase}`
      );
      res.status(400).json({ message: 'Not found...', empty: [] });
    } else {
      logger.info(`Retrived ad containing phrase: ${req.params.searchPhrase}`);
      res.status(200).json(searchAd);
    }
  } catch (err) {
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { title, text, price, location } = req.body;
    const img = req.file;
    const fileType = img ? await getImageFileType(img) : 'unknown';
    const validExtensions = ['image/gif', 'image/jpeg', 'image/png'];
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
      logger.info(`Ad created with id: ${newAd._id}`);
      res.status(201).json({ message: 'Ad created', newAd });
    } else {
      if (img) {
        removeImage(img.filename);
      }
      logger.warn('Invalid request received');
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    if (req.file) {
      removeImage(req.file.filename);
    }
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const { title, text, price, location } = req.body;
    const img = req.file;
    const editAd = await Ads.findById(req.params.id).populate('user');
    const fileType = img ? await getImageFileType(img) : 'unknown';
    const validExtensions = ['image/gif', 'image/jpeg', 'image/png'];
    const date = new Date();
    const formatDate = `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;

    if (editAd) {
      if (req.session.user.id !== String(editAd.user._id)) {
        if (img) {
          removeImage(img.filename);
        }
        logger.warn(`You are not permitted to edit ad with id: ${editAd._id}`);
        res.status(400).json({ message: 'You can only edit your own ads' });
        return;
      } else {
        editAd.title = title || editAd.title;
        editAd.text = text || editAd.text;
        editAd.price = price || editAd.price;
        editAd.date = formatDate;
        editAd.location = location || editAd.location;
        if (img) {
          if (validExtensions.includes(fileType)) {
            removeImage(editAd.img);
            editAd.img = img.filename;
          } else {
            removeImage(img.filename);
            logger.warn(
              `The uploaded image has wrong extension - use gif, jpeg or png`
            );
            res.status(400).json({ message: 'Bad request' });
            return;
          }
        }

        await editAd.save();
        logger.info(`Edited ad with id: ${editAd._id}`);
        res.status(200).json({ message: 'Ad updated', editAd });
      }
    } else {
      if (img) {
        removeImage(img.filename);
      }
      logger.warn(`The ad with id: ${req.params.id} does not exist`);
      res.status(400).json({ message: 'Not found...' });
    }
  } catch (err) {
    if (req.file) {
      removeImage(req.file.filename);
    }
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleteAd = await Ads.findById(req.params.id).populate({
      path: 'user',
      select: '-password',
    });

    if (!deleteAd) {
      logger.warn(`The ad with id: ${req.params.id} does not exist`);
      res.status(400).json({ message: 'Not found...' });
    } else {
      if (req.session.user.id !== String(deleteAd.user._id)) {
        logger.warn(
          `You are not permitted to delete ad with id: ${deleteAd._id}`
        );
        res.status(400).json({ message: 'You can only delete your own ads' });
      } else {
        removeImage(deleteAd.img);
        await deleteAd.remove();
        logger.info(`Deleted ad with id: ${deleteAd._id}`);
        res.status(200).json({ message: 'Ad deleted', deleteAd });
      }
    }
  } catch (err) {
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};
