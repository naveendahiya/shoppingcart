const mongoose = require('mongoose');

// basic details of seller
const sellerSchema = new mongoose.Schema({
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
	shopName: {
		type: String,
		required: true,
	},

	// the products a seller is selling
	productsSell: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
});


// add new product to sellers selling list
sellerSchema.methods.addNewProductToSell = (product) => {
	console.log(this.productsSell);
	const newArr = [...this.productsSell];
	newArr.push(product);
	this.productsSell = newArr;
	return this.save();
	// this.populate('productsSell', (err, result) => {
	//     findProductIndex = result.map(p=>{})
	// });
};


// Update existing product in sellers selling list
sellerSchema.methods.updateExistingProdQuan = (product) => {
	let findProductIndex;
	this.populate('productsSell', (err, result) => {
		findProductIndex = result.findIndex((p) => {
			return p.title === product.title;
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
sellerSchema.methods.removeExistingProduct = (product) => {
	let newArr = [...this.productsSell];
	newArr.filter((p) => {
		return p._id.toString() !== product._id.toString();
	});

	this.productsSell = newArr;
	return this.save();
};

module.exports = mongoose.model('Seller', sellerSchema);
