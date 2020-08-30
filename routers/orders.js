const express = require('express');
const { getAllOrders, createOrder } = require('../controllers/orders');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/create', createOrder);

module.exports = router;
