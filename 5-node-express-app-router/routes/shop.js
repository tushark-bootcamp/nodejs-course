const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('This is my default middleware!');
    res.send('<h1>Hello from Express!!<h1>');
});

module.exports = router;