const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');

router.get('/testAds', adsController.getTest);
router.get('/ads', adsController.getAll);
router.get('/ads/:id', adsController.getById);
router.get('/ads/search/:searchPhrase', adsController.getByPhrase);
router.post('/ads', adsController.add);
router.get('/ads/:id', adsController.edit);
router.get('/ads/:id', adsController.remove);

module.exports = router;
