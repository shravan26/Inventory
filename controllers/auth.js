const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {validationResult} = require('express-validator');

exports.signup = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].param
        });
    }
    const customer = new Customer(req.body);

    customer.save((err,customer) => {
        if(err){
            return res.status(400).json({
                err : "Unable to save the Customer Details",
            });
        }
        return res.json(customer);
    });
}

exports.signin = (req, res) => {
    const {email,password} = req.body;
    Customer.findOne({email},(err,customer) => {
        if(err || !customer){
            return res.status(400).json({
                error : "User does not exist",
            });
        }
        if(!customer.authenticate(password)){
            return res.status(400).json({
                error : "Email and password do not match",
            });
        }
    
    //creating a token 

    const token = jwt.sign({_id : customer._id},process.env.SECRET);

    //Token in cookie 

    res.cookie("token", token, {expire : new Date() + 9999});

    const {_id,name,email} = customer;
    return res.json({token,user: {_id,name,email}});
});
}

exports.signout = (req,res) => {
    res.clearCookie("token");
    return res.send("User Signed out");
}

//Validation for protected routes

exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth",
    algorithms: ['RS256']
});

exports.isAuthenticated = (req, res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENIED",
        })
    }
    next();
}