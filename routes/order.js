const express = require('express');
const router = express.Router();
const {getOrderById,createOrder,updateOrder,cancelOrder,sortOrderByDate} = require('../controllers/order');
const {isSignedIn, isAuthenticated} = require('../controllers/auth');
const {getCustomerById,pushOrderInPurchaseList} = require('../controllers/customer');
router.param('orderId',getOrderById);
router.param('custId',getCustomerById);

router.post('/:custId/create-order',isSignedIn,isAuthenticated,pushOrderInPurchaseList,createOrder);
router.put(`/:orderId/update`,updateOrder);
router.delete('/:orderId/cancel',cancelOrder);
router.get('/:custId/orders/bydate' , sortOrderByDate);

module.exports = router;