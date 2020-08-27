const express =require('express');
const router = express.Router();

const adminControllers=require('../controllers/admin')

//admin/add-products
router.post('/add-products',adminControllers.postAddProduct);

//admin/edit-product/:productId
router.get('/edit-product/:productId',adminControllers.getEditProduct)
//admin/edit-product/:productId
router.post('/edit-product/:productId',adminControllers.postEditProduct)
//admin/delete-product/:porductId
router.post('/delete-product/:productId',adminControllers.postDeleteProduct)

module.exports = router;


