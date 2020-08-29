const express = require('express');
const { createSeller, getSellersList, loginSeller } = require('../controllers/seller');
const { sellerCreationValidator } = require('../validators/shop');
const { runValidation } = require('../validators');

const router = express.Router();

router.get('/', getSellersList);
router.post('/create', sellerCreationValidator, runValidation, createSeller);
router.post('/login', loginSeller);

module.exports = router;
