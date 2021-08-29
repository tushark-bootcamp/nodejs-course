const express = require('express');
const {
    request
} = require('http');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

const products = [];

// /admin/add-product => with GET
router.get('/add-product', (req, res, next) => {
    console.log('This is my add products middleware!');
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        activeShop: false,
        //layout:false
    });
});

// /admin/add-product => with POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({ title: req.body.title });
    res.redirect('/');
});

//module.exports = router;
//module.exports.routesHandler = router;

exports.routes = router;
exports.products = products;