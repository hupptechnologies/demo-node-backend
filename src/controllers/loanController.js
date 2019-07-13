'use strict';

const { body } = require('express-validator/check');
const { loanService } = require('../services');

module.exports = {
	getAvailableLoans: (req, res) => {
		let loans = loanService.getAvailableLoans();
		res.status(200).send({ error: false, message: 'Available loans', data: loans });
	}
}