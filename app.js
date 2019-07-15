'use strict';

require('dotenv').config();
const debug = require('debug')(process.env.DEBUG);
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

const { userService, loanService } = require('./src/services');

debug('booting %o', process.env.DEBUG);

app.get('/', (req, res) => res.send('Hello World!'));


app.use(bodyParser.json());

app.use(expressValidator());

app.use('/api', require('./src/routes'));

app.listen(process.env.PORT, function(err) {
	if (err) {
		debug('Error in listen', err);
	} else {
		debug('Server started"');

		// Populate dummy users and available loans to apply.
		userService.populateUsers();
		loanService.populateLoans();
	}
});

// Export our app for testing purposes
module.exports = app