'use strict';

const moment = require('moment');

let loans = [];
let appliedLoans = [];

module.exports = {
	getAvailableLoans: () => {
		return loans;
	},
	populateLoans: () => {
		loans = [
			{
				description: '$50,000 loan for 1.5 year at 3% interest rate.',
				amount: 50000,
				interest: 3,
				tenture: 1.5,
				tenture_mode: 'year', 						// year | month | day,
				months: 18,									// Added months for easier date calculation.
				id: '8884918b-3e77-4250-946a-2f1d03a5318c'
			},
			{
				description: '$5,000 loan for 3 months at 5% interest rate.',
				amount: 5000,
				interest: 5,
				tenture: 3,
				tenture_mode: 'month', 						// year | month | day
				months: 3,									// Added months for easier date calculation.
				id: 'b0432f7a-9974-48aa-b264-a032abe0f001'
			}
		]
	},
	populateAppliedLoans: () => {
		appliedLoans = [
			{
				createdAt: moment().toISOString(),
				isApproved: true,
				status: 'active',
				userId: '8af49b4d-9392-47d5-af4c-e0ee921e9f0d',
				loanId: '8884918b-3e77-4250-946a-2f1d03a5318c',
				startAt: moment().format('YYYY-MM-DD'),
				endAt: moment().add(18, 'months').format('YYYY-MM-DD')
			},
			{
				createdAt: moment().toISOString(),
				isApproved: true,
				status: 'active',
				userId: 'f17dbc08-cdc4-47c8-a96b-494ea6d6bf0c',
				loanId: 'b0432f7a-9974-48aa-b264-a032abe0f001',
				startAt: moment().format('YYYY-MM-DD'),
				endAt: moment().add(3, 'months').format('YYYY-MM-DD')
			}
		]
	},
	applyLoan: (payload, callback) => {

		const { loanId, userId, startAt } = payload;

		let appliedloan = appliedLoans.find((x) => x.loanId === loanId);

		if (appliedloan) {

			if (moment(startAt).isAfter(appliedloan.endAt) || moment(startAt).isBefore(appliedloan.startAt)) {
				apply(); // Apply loan successfully
			}else {
				callback(false); //loan is already there in this period.
			}
		}else {
			apply(); // Apply loan successfully
		}

		// Reusable apply loan function in multiple scenario.
		function apply() {
			let loan = loans.find((x) => x.id === loanId);

			let payload = {
				createdAt: moment().toISOString(),
				isApproved: true,
				status: 'active',
				userId: userId,
				loanId: loanId,
				startAt: moment(startAt).format('YYYY-MM-DD'),
				endAt: moment(startAt).add(loan.months, 'months').format('YYYY-MM-DD')
			}

			appliedLoans.push(payload);

			callback(true);
		}
	},
	getLoanById: (loanId) => {
		return loans.find((x) => x.id === loanId);
	}
};