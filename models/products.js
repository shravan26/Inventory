var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        trim : true,
    },
    photo : { 
        type : Buffer,
        contentType : String,
    }
},{timestamps : true});

module.exports = mongoose.model("Product" , productSchema);