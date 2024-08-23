const express = require('express');
const router = express.Router();
const createNewPodcast = require('../controller/podcasts/new-podcast');
const getSeriesPodcasts = require('../controller/podcasts/get-series-podcasts');
const getSinglePodcast = require('../controller/podcasts/get-single-podcast');
const trackEvents = require('../controller/podcasts/track-event');
const getPodcastEvents = require('../controller/podcasts/get-podcast-events');
const increaseEarnings = require('../controller/podcasts/increase-earnings');
const getTotalEarnings = require('../controller/podcasts/get-total-earnings');
const authentication = require('../middleware/auth');

router.post('/podcast/new-podcast', authentication, createNewPodcast);
router.post('/podcast/get-series-podcasts', authentication, getSeriesPodcasts);
router.post('/podcast/get-single-podcast', authentication, getSinglePodcast);
router.post('/podcast/track-events', authentication, trackEvents);
router.post('/podcast/get-podcast-events', getPodcastEvents);
router.post('/podcast/increase-earnings', authentication, increaseEarnings);
router.post('/podcast/get-total-earnings', authentication, getTotalEarnings);


module.exports = router;