const express = require('express');
const {
    request
} = require('http');

const router = express.Router();

const products = [];

// /admin/add-product => with GET
router.get('/add-product', (req, res, next) => {
    console.log('This is my add products middleware!');
    // If the add-product.ejs was inside the products folder, the res.render method would be called as 
    // res.render('products/add-product', { 
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
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