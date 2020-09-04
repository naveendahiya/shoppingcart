const express = require('express');
const { getAllOrders, createOrder } = require('../controllers/orders');
const { orderCheckValidator } = require('../validators/shop');
const { runValidation } = require('../validators');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/create', orderCheckValidator, runValidation, createOrder);

module.exports = router;
