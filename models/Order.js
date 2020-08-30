const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema(
	{
		purchaser: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			// required: true,
		},
		email: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		region: {
			type: String,
		},
		postalcode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},

		// card details
		cardDetails: {
			cardname: {
				type: String,
				required: true,
			},
			ccnumber: {
				type: String,
				required: true,
			},
			expdate: {
				type: Date,
				required: true,
			},
			cvv: {
				type: String,
				required: true,
			},
		},

		items: [
			{
				id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
				quantity: {
					type: Number,
				},
			},
		],

		// asked for cancellation
		cancel: {
			type: Boolean,
			default: false,
		},

		// delievery of order
		delievered: {
			type: Boolean,
			// required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Order', ordersSchema);
