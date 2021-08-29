const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('This is my add products middleware!');
    // If the add-product.ejs was inside the products folder, the res.render method would be called as 
    // res.render('products/add-product', { 
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    //console.log(products);
    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
   
}