'use strict';

const router = require('express').Router({ mergeParams: true });
const user = require('../controllers/userController');

router.post('/create', user.validate('register'), user.create);

router.post('/login', user.validate('login'), user.login);

module.exports = router;