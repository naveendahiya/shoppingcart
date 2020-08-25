const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');
//shop/products
router.get('/products', shopController.getAllProducts);

//shop/product/:productId
router.get('/product/:productId', shopController.getProduct);
//shop/cart/:productId
router.post('/cart/:productId', shopController.postCart);

router.get('/cart', shopController.getCart);

router.post('/cart-delete-item/:productId', shopController.postCartDeleteProduct);

// create a product in shop by a specific seller
router.post('/product/create', shopController.createProduct);

// update a product quantity
router.post('/product/update', shopController.updateProductQuantity);

// remove a product
router.post('/product/delete', shopController.removeProduct);
module.exports = router;
