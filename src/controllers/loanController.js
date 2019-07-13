'use strict';

const { body } = require('express-validator/check');
const { validationHandler } = require('../utils');
const { loanService } = require('../services');

module.exports = {
	validate: (method) => {
		switch (method) {
			case 'applyloan': {
				return [
					body('loanId').not().isEmpty().trim().withMessage('Loan id is not supplied!')
				];
			}
		}
	},
	getAvailableLoans: (req, res) => {
		let loans = loanService.getAvailableLoans();
		res.status(200).send({ error: false, message: 'Available loans', data: loans });
	},
	applyLoan: (req, res) => {
		req
			.getValidationResult() // to get the result of above validate fn
			.then(validationHandler())
			.then(async () => {
				const { loanId } = req.body;

				let loan = loanService.getLoanById(loanId);

				let userId = req.decoded.id;
				if (loan) {
					loanService.applyLoan(userId, loanId, (result) => {
						if (result) {
							res.status(200).send({ error: false, message: 'Loan applied successfully.'});
						}else {
							res.status(400).send({ error: true, message: 'Something went wrong!' });
						}
					});
				}else {
					throw new Error('No loan available!');
				}
			})
			.catch((err) => {
				res.status(400).send({ error: true, message: err.message });
			});
	}
}