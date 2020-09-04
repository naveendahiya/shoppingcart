const { check } = require('express-validator');

exports.userCreateValidator = [
	check('firstname').not().isEmpty().withMessage('First name cannot be empty'),
	check('lastname').not().isEmpty().withMessage('Last name caanot be empty'),
	check('email').isEmail().normalizeEmail().withMessage('Email entered is invalid'),
];

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

exports.orderCheckValidator = [
	check('email').isEmail().normalizeEmail().not().isEmpty().withMessage('Must have a email'),
	check('address').not().isEmpty().withMessage('Need address to ship'),
	check('city').not().isEmpty().withMessage('City required'),
	check('postalcode').not().isEmpty().withMessage('Need postalcode'),
	check('country').not().isEmpty().withMessage('Country required'),
	check('cardname').not().isEmpty().withMessage('Card holder name required'),
	check('ccnumber').not().isEmpty().withMessage('Card Number field required'),
	check('expdate').not().isEmpty().withMessage('Expiry date of card is required'),
	check('cvv').not().isEmpty().withMessage('CVV cannot be empty'),
	check('items').not().isEmpty().withMessage('Atleast one product must be there'),
];
