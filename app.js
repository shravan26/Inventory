const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const custRoutes = require('./routes/customer');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/order');

const server = express();

//Middleware
server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors());

//Routes
server.use('/api',authRoutes);
server.use('/api',custRoutes);
server.use('/api',productRoutes);
server.use('/api',orderRoutes);

//DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true,
}).then(() => {console.log("DB Connected")});

//Server
const port = process.env.PORT || 3000;

server.listen(port,() => {
    console.log('Server listening on port ' + port);
});
