const express = require('express');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log('This is my default middleware!');
    const products = adminData.products;
    console.log(products);

    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
    });
});

module.exports = router;