const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema(
	{
		purchaser: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		name: {
			type: String,
		},
		ccnumber: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Order', ordersSchema);
