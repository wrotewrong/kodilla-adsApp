const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', adsController.getAll);
router.get('/ads/:id', adsController.getById);
router.get('/ads/search/:searchPhrase', adsController.getByPhrase);
router.post(
  '/ads',
  authMiddleware,
  imageUpload.single('img'),
  adsController.add
);
router.put('/ads/:id', authMiddleware, adsController.edit);
router.delete('/ads/:id', authMiddleware, adsController.remove);

module.exports = router;
