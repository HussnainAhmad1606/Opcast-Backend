const express = require('express');
const app = express();
const router = express.Router();
const login = require('../controller/auth/login')
const signup = require('../controller/auth/signup')
const verify = require('../controller/auth/verify')
const refresh = require('../controller/auth/refresh')
 

router.route('/login').post(login)
router.route('/signup').post(signup);
router.route('/refresh').post(refresh);
router.route('/verify').post(verify);

module.exports = router;