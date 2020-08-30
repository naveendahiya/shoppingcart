const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
	const { email, address, city, region, postalcode, country, cardname, ccnumber, expdate, cvv, items } = req.body;

	let cdetails = {
		cardname,
		ccnumber,
		expdate,
		cvv,
	};
	// console.log(cdetails);
	// console.log(`****************************`);
	// console.log(items);

	const order = new Order({
		email,
		address,
		city,
		region,
		postalcode,
		country,
		cardDetails: cdetails,
		items,
	});

	await order.save();
	let sess;
	try {
		sess = await mongoose.startSession();
		sess.startTransaction();
		try {
			for (let item of items) {
				let product = await Product.findById(item.id);
				// console.log(product);
				if (item.quantity > product.quantity) {
					throw new Error('Product quantity greater than available quantity');
				} else {
					product.quantity -= item.quantity;
					await product.save({ session: sess });
				}
			}
		} catch (error) {
			// console.log('error from');
			// console.log(error);
			await order.remove();
			await sess.abortTransaction();
			return res.status(422).json({ error: error.message });
		}
		await sess.commitTransaction();
	} catch (error) {
		// console.log(error);
		await order.remove();
		await sess.abortTransaction();
		return res.status(500).json({ error: 'Error in placing order. Try again later' });
	}

	return res.status(200).json({ message: 'Order placed successfully', order });
};

exports.getAllOrders = async (req, res) => {
	let ordersList;
	try {
		ordersList = await Order.find({});
	} catch (error) {
		return res.status(500).json({ error: 'Error in fecthong orders' });
	}

	if (ordersList.length === 0) {
		return res.status(400).json({ error: 'No orders made yet', ordersList });
	}

	return res.status(200).json({ ordersList });
};
