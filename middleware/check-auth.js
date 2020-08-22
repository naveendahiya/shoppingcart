const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const decodedToken = jwt.verify(token, 'important_sharing_not_allowed');
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Authentication failed' });
	}
};
