const http = require('http');

const express = require('express');

const app = express();


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

app.use('/', (req, res, next) => {
    console.log('This always runs since its the starting middleware !');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('This is my add products middleware!');
    res.send('<h1>The "Add Products" Page !!<h1>');
});

app.use('/', (req, res, next) => {
    console.log('This is my default middleware!');
    res.send('<h1>Hello from Express!!<h1>');
});


// const server = http.createServer(app);

// server.listen(3000);

// With exress the above two lines can be short cutted

app.listen(3000);