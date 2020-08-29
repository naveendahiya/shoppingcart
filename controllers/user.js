const express = require('express');
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
	let usersList;
	try {
		usersList = await User.find({});
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}

	return res.status(200).json({ usersList });
};

exports.createUser = async (req, res) => {
	const { firstname, lastname, email } = req.body;
	let createdUser;

	try {
		existingUser = await User.findOne({ email });
	} catch (error) {
		return res.status(503).json({ message: 'Server down' });
	}

	if (existingUser) {
		return res.status(400).json({
			email: 'Email already taken. Either login with the email or use different email to create account',
		});
	}

	try {
		createdUser = new User({
			firstname,
			lastname,
			email,
		});
		await createdUser.save();
	} catch (error) {
		console.log(error);
		return res.status(503).json({ error: 'Unable to create your account' });
	}

	return res.status(201).json({ message: 'Created your customer account', createdUser });
};
