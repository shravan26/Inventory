const Products = require('../models/products');

const errorHandler = (msg) =>{
    return res.status(400).json({
        error : msg
    })
}

exports.getProductById = (req,res,next,id) => {
    Products.findById(id).exec((err,product) => {
        if(err || !product) {
            errorHandler("product does not exist");
        }
        req.product = product;
        next();
    });
}

exports.getAllProducts = (req, res) => {
    Products.find().exec((err, products) => {
        if(err){
            errorHandler("Unable to fetch products");
        }
        return res.json(products);
    })
}

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) => {
        if(err) {
            errorHandler('Error with submitting');
        }
        Products.find({name : fields.name}).exec((err,product) => {
            if(err){
                const {name,price} = fields;
                let products = new Products(fields);
                if(files.photo) {
                    if(files.photo.size > 3000000) {
                        errorHandler('File too big');
                    }
                }
                products.photo.data = fs.readFileSync(files.photo.path);
                products.photo.contentType = files.photo.type;
                return res.json(products);
            }
            const {price} = fields;
            product.price = price;
            if(files.photo) {
                if(files.photo.size > 3000000){
                    errorHandler('File too big');
                }
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
            return res.json(product);
        });
    });
}

exports.photo = (req,res,next) => {
    if(req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}