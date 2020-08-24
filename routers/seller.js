const express = require('express');
const { createSeller, getSellersList } = require('../controllers/seller');

const router = express.Router();

router.get('/', getSellersList);
router.post('/create', createSeller);

module.exports = router;
