const express = require('express');
const router = express.Router();
const createNewSeries = require('../controller/series/new-series');
const getUserSeries = require('../controller/series/get-user-series');
const authentication = require('../middleware/auth');
 

router.post('/series/new-series', authentication, createNewSeries);
router.post('/series/get-user-series', authentication, getUserSeries);

module.exports = router;