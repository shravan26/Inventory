const Customer = require('../models/customer');
const Order = require('../models/order');
const {errorHandler} = require('./products');

exports.getCustomerById = (req,res,next,id) => {
    Customer.findById(id).exec((err,customer) => {
        if(err){
            return res.status(400).json({
                error : "User does not exist",
            });
        }
        req.profile = customer,
        next();
    })
}

exports.customerPurchaseList = (req, res) => {
    Order.find({user : req.profile._id})
    .populate('user','_id name')
    .exec((err,order) => {
        if(err) {
            errorHandler('Error Getting the Orders');
        }
        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id : product._id,
            name : product.name,
            price : product.price,
        })
    })
}

exports.getSortedCustomerList = (req,res) => {
    Customer.find()
    .exec((err,customers)=> {
        if(err){
            errorHandler('Error Fetching customers');
        }
        res.json(customers);
    });
}