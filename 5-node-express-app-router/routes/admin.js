const express = require('express');

const router = express.Router();

// /admin/add-product => with POST
router.get('/add-product', (req, res, next) => {
    console.log('This is my add products middleware!');
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// /admin/add-product => with GET
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
    //res.send('<h1>The "Products" Page !!<h1>');
});

module.exports = router;
