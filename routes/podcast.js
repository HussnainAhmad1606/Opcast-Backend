const express = require('express');
const router = express.Router();
const createNewPodcast = require('../controller/podcasts/new-podcast');
const getSeriesPodcasts = require('../controller/podcasts/get-series-podcasts');
const getSinglePodcast = require('../controller/podcasts/get-single-podcast');
const authentication = require('../middleware/auth');

router.post('/podcast/new-podcast', authentication, createNewPodcast);
router.post('/podcast/get-series-podcasts', authentication, getSeriesPodcasts);
router.post('/podcast/get-single-podcast', authentication, getSinglePodcast);


module.exports = router;