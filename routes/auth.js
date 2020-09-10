const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {signout,signup,signin} = require('../controllers/auth');


router.get('/signout',signout);

router.post('/signup',[
    body('email').isEmail().withMessage('Not a Valid Email Id'),
    body('password').isLength({min : 5}).withMessage('Password too short')
], signup);

router.post('/signin',[
    body('email').isEmail().withMessage('Not a Valid Email Id'),
    body('password').isLength({min : 5}).withMessage('Password too short')
],signin);

module.exports = router;