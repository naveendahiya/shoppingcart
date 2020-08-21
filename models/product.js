const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		// title of our product
		title: {
			type: String,
			required: true,
		},
		// price
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
		},
		quantity: {
			type: Number,
			required: true,
		},
		// soldBy here will refer to the creator of product
		soldBy: {
			type: Schema.Types.ObjectId,
			ref: 'Seller',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// on querying products to show them we will give al info of product(soldBy depends)

module.exports = mongoose.model('Product', productSchema);
