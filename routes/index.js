// require Express and Express router
const express = require('express');
const router = express.Router();

// require modules
const home = require('./modules/home');
const restaurants = require('./modules/restaurants');
const search = require('./modules/search');
const users = require('./modules/users');
const auth = require('./modules/auth');
// 掛載 middleware
const { authenticator } = require('../middleware/auth');

router.use('/restaurants', authenticator, restaurants);
router.use('/search', authenticator, search);
router.use('/users', users);
router.use('/auth', auth);
router.use('/', authenticator, home);

// export router
module.exports = router;
