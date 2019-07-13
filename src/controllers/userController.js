'use strict';

const { body } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationHandler } = require('../utils');
const { userService } = require('../services');
const saltRounds = 4;

module.exports = {
	validate: (method) => {
		switch (method) {
			case 'login': {
				return [
					body('email').isEmail().withMessage('Invalid email address'),
					body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
				];
			}

			case 'register': {
				return [
					body('firstName').not().isEmpty().trim().withMessage('First name is required'),
					body('lastName').not().isEmpty().trim().withMessage('Last name is required'),
					body('email').isEmail().withMessage('Invalid email address'),
					body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
				];
			}
		}
	},
	create: (req, res) => {
		req
			.getValidationResult() // to get the result of above validate fn
			.then(validationHandler())
			.then(async () => {

				const { email } = req.body;

				const data = userService.getUserByEmail(email);

				if (data) {
					throw new Error('Email already exists!');
				}

				req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

				let user = req.body;

				userService.add(user);

				res.status(200).send({ error: false, message: 'User created successfully', data: user });
			})
			.catch((e) => {
				res.status(400).send({ error: true, message: e.message });
			});
	},
	login: (req, res) =>{
		req
			.getValidationResult() // to get the result of above validate fn
			.then(validationHandler())
			.then(async () => {
				const { email, password } = req.body;
				const user = userService.getUserByEmail(email);
				if (user) {

					// Compare password
					let compare = bcrypt.compareSync(password, user.password);

					if (compare) {

						let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

						res.status(200).send({ error: false, message: 'Login successfull', data: { user, token } });
					}else {
						res.status(401).send({ error: true, message: 'Invalid email or password.' });
					}
				}else {
					res.status(401).send({ error: true, message: 'Invalid email or password.' });
				}
			})
			.catch((err) => {
				res.status(400).send({ error: true, message: err.message });
			});
	}
};
