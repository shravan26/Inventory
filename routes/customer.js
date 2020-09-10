const express = require('express');
const router = express.Router();

const {getCustomerById,customerPurchaseList,getSortedCustomerList} = require('../controllers/customer');
const {isSignedIn,isAuthenticated} = require('../controllers/auth');

router.param = ("custId",getCustomerById);

router.get('/customer/orders/:custId',isSignedIn,isAuthenticated,customerPurchaseList);
router.get('/customers',getSortedCustomerList);

module.exports = router;
