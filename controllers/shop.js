const mongoose = require('mongoose');
const Product = require('../models/product');
const Seller = require('../models/seller');

exports.getAllProducts = (req, res, next) => {
	Product.find().then((products) => {
		console.log(products);
		return res.status(200).json({
			data: {
				products: products,
			},
			message: 'all products',
		});
	});
};
//shop/product/:productId
exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			console.log(product);
			return res.status(200).json({
				data: {
					product: product,
				},
				message: 'single product',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCart = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then((result) => {
			console.log(result);
			return res.status(200).json({
				data: {
					product: result,
				},
				message: 'item added to cart',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.populate('cart.items.productId')
		.execPopulate()
		.then((user) => {
			const products = user.cart.items;
			return res.status(200).json({
				data: {
					products: products,
				},
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.params.productId;
	req.user
		.removeFromCart(prodId)
		.then((result) => {
			return res.status(200).json({
				message: 'item deleted from cart',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// will create a product
exports.createProduct = async (req, res, next) => {
	const { title, price, description, imageUrl, quantity } = req.body;
	const createdProduct = new Product({
		title,
		price,
		description,
		imageUrl,
		quantity,
		// soldBy: req.userData.userId ,
		soldBy: req.body.id,
	});

	let user;
	try {
		// user = await Seller.findById(req.userData.userId);
		user = await Seller.findById(req.body.id);
	} catch (error) {
		console.log(error);
		return res.status(404).json({ message: 'Cannot find any seller for the given credentials' });
	}

	if (!user) {
		return res.status(404).json({ message: 'Cannot find any seller' });
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdProduct.save({ session: sess });
		// user.productsSell.push(createdProduct);
		await user.addNewProductToSell(createdProduct);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Failed to add product for selling' });
	}

	return res.status(200).json({ message: 'Created product to sell', product: createdProduct });
};

exports.updateProductQuantity = async (req, res, next) => {
	const { title, id, quantity, userId } = req.body;
	let existingProduct;
	try {
		existingProduct = await Product.findById(id);
	} catch (err) {
		return res.status(404).json({ message: 'No such product found' });
	}

	if (!existingProduct) {
		return res.status(404).json({ message: 'Product not found' });
	}

	let user;
	try {
		// user = await Seller.findById(req.userData.userId);
		user = await Seller.findById(userId);
	} catch (error) {
		return res.status(404).json({ message: 'Cannot find any seller for the given credentials' });
	}

	if (!user) {
		return res.status(404).json({ message: 'Cannot find any seller' });
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		existingProduct.quantity = quantity;
		await existingProduct.save({ session: sess });
		// await user.updateExistingProdQuan(existingProduct);
		// await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (error) {
		return res.status(500).json({ message: 'Upadting quantity failed. Please try again later' });
	}

	return res.status(200).json({ message: 'Updated quantity of product', product: existingProduct });
};

exports.removeProduct = async (req, res, next) => {
	const { title, id, quantity, userId } = req.body;
	let existingProduct;
	try {
		existingProduct = await Product.findById(id);
	} catch (err) {
		return res.status(404).json({ message: 'No such product found' });
	}

	if (!existingProduct) {
		return res.status(404).json({ message: 'Product not found' });
	}

	let user;
	try {
		// user = await Seller.findById(req.userData.userId);
		user = await Seller.findById(userId);
	} catch (error) {
		return res.status(404).json({ message: 'Cannot find any seller for the given credentials' });
	}

	if (!user) {
		return res.status(404).json({ message: 'Cannot find any seller' });
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await existingProduct.remove({ session: sess });
		await user.removeExistingProduct(existingProduct);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (error) {
		return res.status(500).json({ message: 'Upadting quantity failed. Please try again later' });
	}

	return res.status(200).json({ message: 'Updated quantity of product', product: existingProduct });
};
