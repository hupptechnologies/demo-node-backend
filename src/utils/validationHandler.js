'use strict';

module.exports = next => result => {
	if (result.isEmpty()) return;
	if (!next)
		throw new Error(
			result
				.array()
				// .map(i => `'${i.param}' has ${i.msg}`)
				.map(i => `${i.msg}`)
				.join(', ')
		);
	else
		return next(
			new Error(
				result
					.array()
					// .map(i => `'${i.param}' has ${i.msg}`)
					.map(i => `${i.msg}`)
					.join(', ')
			)
		);
};
