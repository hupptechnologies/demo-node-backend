'use strict';

const router = require('express').Router({ mergeParams: true });
const loan = require('../controllers/loanController');

router.get('/available-loans', loan.getAvailableLoans);

module.exports = router;