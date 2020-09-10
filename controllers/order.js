const {Order,ProductCart} = require('../models/order');
const {errorHandler} = require('./products')
exports.getOrderById = (req,res,next,id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err,order) => {
        if(err || !order) {
            return res.status(400).json({
                error : "No Order Placed ",
            })
        }
        res.order = order;
        next();
    });
}

exports.createOrder = (req, res) => {
    req.body.order.customer = req.profile;
    const order = new Order(req.body.order);
    order.save((err,order) => {
        if(err|| !order){
            errorHandler('Error creating Order');
        }
        return res.json(order);
    })
}

exports.updateOrder = (req, res) => {
    Order.findOneAndUpdate(
        {id: req.order._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err, order) =>{
            if(err) {
                errorHandler('Error updating order');
            }
            res.json(order);
        })
}

exports.cancelOrder = (req, res) => {
    let order = req.order;
    order.remove((err, deletedOrder) => {
        if(err) {
            errorHandler('Error cancelling the order');
        }
        return res.json({
            message : 'Order was canceled',
            order : deletedOrder._id,
        })
    })
}

exports.sortOrderByDate = (req, res) => {
    Order.find()
    .select('products')
    .sort('-updatedAt')
    .exec((err,sortedOrder) => {
        if(err){
            errorHandler('Error sorting the products');
        }
        return res.json(sortedOrder);
    })
}