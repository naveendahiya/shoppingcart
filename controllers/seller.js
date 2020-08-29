const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');

exports.createSeller = async (req, res) => {
	const { name, email, number, shopName, password } = req.body;
	let createdSeller, existingSeller;

	try {
		existingSeller = await Seller.findOne({ email });
	} catch (error) {
		return res.status(503).json({ message: 'Server down' });
	}

	if (existingSeller) {
		return res.status(400).json({
			email: 'Email already taken. Either login with the email or use different email to create account',
		});
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Could not create your account. Try again later' });
	}
	try {
		createdSeller = new Seller({
			name,
			email,
			number,
			shopName,
			password: hashedPassword,
			productsSell: [],
		});
		await createdSeller.save();
	} catch (error) {
		return res.status(500).json({ error: 'Error creating a new seller' });
	}

	return res.status(200).json({ message: 'Created your seller account successfully', seller: createdSeller });
};

exports.loginSeller = async (req, res) => {
	const { email, password } = req.body;
	let existingSeller;
	try {
		existingSeller = await Seller.findOne({ email });
	} catch (error) {
		return res.status(500).json({ error: 'Error logging in. Try again later' });
	}
	if (!existingSeller) {
		return res.status(404).json({ error: 'Seller not found. Try signing up instead' });
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingSeller.password);
	} catch (error) {
		return res.status(500).json({ error: 'Server error. Try again.' });
	}

	if (!isValidPassword) {
		return res.status(401).json({ error: 'Invalid credentials' });
	}

	let token;
	try {
		token = jwt.sign({ id: existingSeller._id.toString(), email: existingSeller.email }, 'secret_key_here', {
			expiresIn: '1d',
		});
	} catch (error) {
		return res.status(500).json({ error: 'Logging in failed. Try again later' });
	}

	return res.status(201).json({ token, seller: existingSeller });
};

exports.getSellersList = async (req, res) => {
	let sellersList;
	try {
		sellersList = await Seller.find({});
		// .populate('productsSell');
	} catch (error) {
		return res.status(500).json({ message: 'Error in finding sellers list' });
	}

	return res.status(200).json({ sellersList });
};
