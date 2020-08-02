const express =require('express');
const router = express.Router();

const adminControllers=require('../controllers/admin')
router.post('/add-products',adminControllers.postAddProduct);

router.get('/products',adminControllers.getAllProducts)
module.exports = router;