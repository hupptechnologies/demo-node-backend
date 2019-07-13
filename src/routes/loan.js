'use strict';

const router = require('express').Router({ mergeParams: true });
const loan = require('../controllers/loanController');
const { tokenValidator } = require('../utils');

router.get('/available-loans', tokenValidator, loan.getAvailableLoans);

module.exports = router;