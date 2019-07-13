'use strict';

const uuidv4 = require('uuid/v4');

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
				tenture_mode: 'year', // year | month | day,
				id: '8884918b-3e77-4250-946a-2f1d03a5318c'
			},
			{
				description: '$5,000 loan for 3 months at 5% interest rate.',
				amount: 5000,
				interest: 5,
				tenture: 3,
				tenture_mode: 'month', // year | month | day
				id: 'b0432f7a-9974-48aa-b264-a032abe0f001'
			}
		]
	},
	populateAppliedLoans: () =>{
		
	}
};