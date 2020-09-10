var mongoose = require('mongoose');
var {ObjectId} = require('mongoose');

var productCartSchema = new mongoose.Schema({
    product : {
        type : ObjectId,
        ref : "Product"
    },
    name : String,
    count : Number,
    price : Number,
},{timestamps:true});

const ProductCart = mongoose.model("ProductCart",productCartSchema);

var orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction : {},
    amount : {
        type : Number,
    },
    updated : Date,
    customer: {
        type : ObjectId,
        ref : "Customer"
    }
},{timestamps : true});

const Order =mongoose.model("Order", orderSchema);
module.exports = {Order,ProductCart};