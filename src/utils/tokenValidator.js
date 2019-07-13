'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

	if (token === undefined || token === '' || token === null) {
		return res.status(401).send({ error: true, message: 'Authorization token is not supplied!' });
	}

	if(token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length);
	}

	if(token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).send({ error: true, message: 'Authorization failed!' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}else {
		return res.status(401).send({ error: true, message: 'Authorization token is not supplied!' });
	}
};