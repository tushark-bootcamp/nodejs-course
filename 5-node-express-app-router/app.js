const http = require('http');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');


// The below code that funnels through multiple middleware calls is just to demonstrate how you can weave a series of middlewares through one another.
// app.use((req, res, next) => {
//     console.log('In the middleware!');
//     next(); // Allows the request to continue to the next middleware in the line
// });

// app.use((req, res, next) => {
//     console.log('In the next middleware!');
//     next(); // Allows the request to continue to the next middleware in the line
// });

// app.use((req, res, next) => {
//     console.log('This is my last middleware!');
//     res.send('<h1>Hello from Express!!<h1>');
// });

// If you don't need an interwoven middleware and path based independent calling of middlewares, here's the strategy.

// app.use('/', (req, res, next) => {
//     console.log('This always runs since its the starting middleware !');
//     next();
// });

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found<h1>');
})



//** Moved to admin.js */
// app.use('/add-product', (req, res, next) => {
//     console.log('This is my add products middleware!');
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// });

// // Instead of app.use which will work for all http methods, USE app.post() to filter out POST requests.
// // app.use('/product', (req, res, next) => {
// // with this change, if you simply try to type "localhost:3000/product", it will directly go to "/" default path since /product can only be invoked by a POST method 
// app.post('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
//     //res.send('<h1>The "Products" Page !!<h1>');
// });

//** Moved to shop.js */
// app.use('/', (req, res, next) => {
//     console.log('This is my default middleware!');
//     res.send('<h1>Hello from Express!!<h1>');
// });


// const server = http.createServer(app);

// server.listen(3000);

// With exress the above two lines can be short cutted

app.listen(3000);