const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('This is my add products middleware!');
    // The first param of the res.render() method is the path to the view (.ejs file); 
    // here its path to the edit-product.ejs (formerly add-product.ejs) under the admin folder.
    // Hence 'admin/edit-product' without the .js
    res.render('admin/edit-product', {
        editing: false,
        pageTitle: 'Add Product',
        // path is only used to highlight the menu on navigation & not to be confused with router.
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(! editMode) {
        return res.redirect('/');
    }
    // productId should be exactly as defined in your route => :productId
    const prodId = req.params.productId;
    console.log('This is my edit products middleware!');
    Product.findById(prodId, product => {
        if(!product) {
            return res.redirect('/');
        }
        console.log(product);
        res.render('admin/edit-product', {
            editing: editMode,
            product: product,
            // path is non-existent in navigation bar as we don't want to highlight any path on the navigation bar for edit product.
            pageTitle: 'Edit Product',
            path: '/admin/edit-product'
        });
    });
}

exports.postEditProduct = (req, res, next) => {
    console.log(req.body);
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const updatedProduct = new Product(prodId, title, imageUrl, description, price);
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    console.log(req.body);
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}


exports.getProducts = (req, res, next) => {
    //console.log(products);
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}