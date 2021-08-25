const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

// /admin/add-product => with GET
router.get('/add-product', (req, res, next) => {
    console.log('This is my add products middleware!');
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => with POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
    //res.send('<h1>The "Products" Page !!<h1>');
});

//module.exports = router;
module.exports.routesHandler = router;