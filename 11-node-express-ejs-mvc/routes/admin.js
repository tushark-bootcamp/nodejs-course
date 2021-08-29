const express = require('express');

const productsController = require('../controllers/products'); 

const router = express.Router();


// /admin/add-product => with GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => with POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
//import syntax => 
// 1. const adminRoutes = require('./routes/admin');
// 2. app.use('/admin', adminRoutes);

// Another syntax to export router. This syntax is used when more than 1 conts have to be exported
// exports.routes = router; 
// import syntax =>
// 1. const adminRoutes = require('./routes/admin');
// 2. app.use('/admin', adminRoutes.routes);

// Yet another syntax to export
// module.exports.routesHandler = router;
