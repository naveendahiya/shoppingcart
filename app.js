const express = require('express');

const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRouters = require('./routers/admin');
const shopRouters = require('./routers/shop');
const sellerRoutes = require('./routers/seller');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
// 	User.findById('5f2aebfe49198d18f8af0c5b')
// 		.then((user) => {
// 			//storing user object in req
// 			req.user = user;
// 			next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Sample Pet Store App',
			description: 'This is a sample server for a pet store.',
			termsOfService: 'http://example.com/terms/',
			contact: {
				name: 'API Support',
				url: 'http://www.example.com/support',
				email: 'support@example.com',
			},
			license: {
				name: 'Apache 2.0',
				url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
			},
			version: '3.0.3n',
		},
	},
	apis: ['./routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/shop', shopRouters);
app.use('/admin', adminRouters);
app.use('/seller', sellerRoutes);

mongoose
	.connect('mongodb+srv://user1:pTLecUakR9PyV8ZF@cluster0.opobk.mongodb.net/shop?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					name: 'ayushi',
					email: 'ayushi@gmail.com',
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});

		app.listen(8000);
		console.log('connected to mongodb');
	})
	.catch((err) => {
		console.log(err);
	});
