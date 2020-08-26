const { check } = require('express-validator');

exports.sellerCreationValidator = [
	check('number').not().isEmpty().withMessage('Contact number is not valid'),
	check('name').not().isEmpty().withMessage('Name field caanot be empty'),
	check('shopName').not().isEmpty().withMessage('Need a shopname'),
	check('email').isEmail().normalizeEmail().withMessage('Email entered is invalid'),
	check('password').isLength({ min: 6 }).withMessage('Length of passowrd must be atleast 6 character'),
];

exports.productCreationValidator = [
	check('title').not().isEmpty().withMessage('Must have a title'),
	check('price').not().isEmpty().isInt({ gt: 0.0 }).withMessage('Price entered is invalid'),
	check('description').not().isEmpty().withMessage('Description needed'),
	check('imageUrl').not().isEmpty().withMessage('Need an image url'),
	check('quantity').not().isEmpty().isInt({ min: 0 }).withMessage('Quantity entered is invalid'),
];

exports.productUpdationValidator = [
	check('quantity').not().isEmpty().isInt({ min: 0 }).withMessage('Quantity entered is invalid'),
];
