const express = require('express');
const router = express.Router();
const createNewSeries = require('../controller/series/new-series');
const getUserSeries = require('../controller/series/get-user-series');
const getSingleSeries = require('../controller/series/get-single-series');
const authentication = require('../middleware/auth');
 

router.post('/series/new-series', authentication, createNewSeries);
router.post('/series/get-user-series', authentication, getUserSeries);
router.post('/series/get-single-series', authentication, getSingleSeries);

module.exports = router;