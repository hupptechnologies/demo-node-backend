'use strict';

const moment = require('moment');
const { body } = require('express-validator/check');
const { validationHandler } = require('../utils');
const { loanService } = require('../services');

module.exports = {
	validate: (method) => {
		switch (method) {
			case 'applyloan': {
				return [
					body('loanId').not().isEmpty().trim().withMessage('Loan id is not supplied!'),
					body('startAt').not().isEmpty().trim().withMessage('Start date not supplied!'),
					body('startAt').custom(value => {
						return !moment(value).isBefore(moment().format('YYYY-MM-DD'));
					}).withMessage('Start date can\'t be past date!'),
					body('startAt').custom(value => { return moment(value).isValid() }).withMessage('Invalid start date supplied!')
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
				const { loanId, startAt } = req.body;

				let loan = loanService.getLoanById(loanId);

				let userId = req.decoded.id;
				if (loan) {

					let payload = {
						userId,
						loanId,
						startAt
					};

					loanService.applyLoan(payload, (result) => {
						if (result) {
							res.status(200).send({ error: false, message: 'Loan applied successfully.'});
						}else {
							res.status(400).send({ error: true, message: 'Loan is already going on this period.' });
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