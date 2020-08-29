const express = require('express');
const { userCreateValidator } = require('../validators/shop');
const { createUser, getAllUsers } = require('../controllers/user');
const { runValidation } = require('../validators');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/create', userCreateValidator, runValidation, createUser);

module.exports = router;
