const express =require('express');
const router = express.Router();

const shopController=require('../controllers/shop')
//shop/products
router.get('/products',shopController.getAllProducts)

//shop/product/:productId
router.get('/product/:productId',shopController.getProduct)

router.post('/cart/:productId',shopController.postCart)

router.get('/cart',shopController.getCart)

router.post('/cart-delete-item/:productId',shopController.postCartDeleteProduct)
module.exports = router;