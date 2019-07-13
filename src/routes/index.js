'use strict';

const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/loan', require('./loan'));

module.exports = router;