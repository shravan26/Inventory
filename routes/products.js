const express = require('express');
const { getCustomerById } = require('../controllers/customer');
const { getProductById,getAllProducts,photo,createProduct } = require('../controllers/products');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const router = express.Router();


router.param('productId', getProductById);
router.param('custId',getCustomerById)

router.get('/products',getAllProducts);
router.get('/product/:productId/photo',photo);
router.post('/:custId/create-product',isSignedIn,isAuthenticated,createProduct);

module.exports = router;