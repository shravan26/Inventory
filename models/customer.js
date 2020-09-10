var mongoose = require('mongoose');
var {v1 : uuidv1} = require('uuid');
var crypto = require('crypto');

var customerSchema = mongoose.Schema({
    name : {
        type : String,
        maxLength : 50,
        trim : true,
        required : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    encry_password :{
        type : String,
        required : true
    },
    salt : String,
    purchases : {
        type : Array,
        default : [],
    }
},{timestamps : true});

customerSchema.virtual('password')
.set(function (password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function (){
    return this._password;
})

customerSchema.methods = {
    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },
    
    securePassword: function(plainPassword) {
        if(!plainPassword) return "";
        try{
            return crypto.createHmac('sha256',this.salt)
            .update(plainPassword)
            .digest('hex')
        }catch(err){
            return err;
        }
    }
}

module.exports = mongoose.model("Customer", customerSchema);