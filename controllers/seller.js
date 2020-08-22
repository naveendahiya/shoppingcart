const bcrypt = require('bcrypt');
const Seller = require('../models/seller');

exports.createSeller = async (req, res) => {
	const { name, email, number, shopName, password } = req.body;
	let createdSeller;
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
