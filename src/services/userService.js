'use strict';

const uuidv4 = require('uuid/v4');

let users = [];

module.exports = {
	add: (user) => {
		user.id = uuidv4();
		users.push(user);
	},
	getUsers: () => {
		return users;
	},
	getUserById: (userId) => {
		return users.find((x) => x.id === userId);
	},
	getUserByEmail: (email) => {
		return users.find((x) => x.email === email);
	},
	populateUsers: () => {
		users = [
			{
				firstName: 'Ren',
				lastName: 'Money',
				email: "renmoney@email.com",
				password: "$2b$04$qjYcf2CjaWOHcnk.dKJbJ.6njCJjiAYczpxnnTokImSseeDhpbFoW",
				id: "8af49b4d-9392-47d5-af4c-e0ee921e9f0d"
			},
			{
				firstName: 'Kia',
				lastName: 'Kia',
				email: "kia@email.com",
				password: "$2b$04$qjYcf2CjaWOHcnk.dKJbJ.6njCJjiAYczpxnnTokImSseeDhpbFoW",
				id: "f17dbc08-cdc4-47c8-a96b-494ea6d6bf0c"
			}
		]
	}
};