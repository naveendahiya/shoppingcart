const mongoose = require('mongoose');

// basic details of seller

const Schema = mongoose.Schema;
const sellerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	number: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
	},
	shopName: {
		type: String,
		required: true,
	},

	// the products a seller is selling
	productsSell: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
});

// add new product to sellers selling list
sellerSchema.methods.addNewProductToSell = function (product) {
	// console.log(this);
	// console.log(this.productsSell);
	// console.log('here');
	const newArr = [...this.productsSell];
	newArr.push(product);
	this.productsSell = newArr;
	return this.save();
	// this.populate('productsSell', (err, result) => {
	//     findProductIndex = result.map(p=>{})
	// });
};

// Update existing product in sellers selling list
sellerSchema.methods.updateExistingProdQuan = function (product) {
	let findProductIndex;
	this.populate('productsSell', (err, result) => {
		findProductIndex = result.findIndex((p) => {
			return p._id.toString() === product.id.toString();
		});
	});
	let newArr = [...this.productsSell];
	if (findProductIndex >= 0) {
		newArr[findProductIndex].quantity = product.quantity;
	}
	this.productsSell = newArr;
	return this.save();
};

// remove a product from sellers list he do not want to sell
sellerSchema.methods.removeExistingProduct = function (product) {
	let newArr = [...this.productsSell];
	newArr.filter((p) => {
		return p._id.toString() !== product._id.toString();
	});

	this.productsSell = newArr;
	return this.save();
};

module.exports = mongoose.model('Seller', sellerSchema);
