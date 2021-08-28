const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log('This is my default middleware!');
    const products = adminData.products;
    console.log(products);

    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {
        prods: products,
        docTitle: 'shop',
        path: '/',
        hasProducts: products.length > 0,
        productCSS: true,
        formsCSS: true,
        activeShop: true
        //activeAddProduct: false,
        //layout:false
    });
});

module.exports = router;