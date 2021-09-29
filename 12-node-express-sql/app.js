const http = require('http');
const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

// This tells the express where to look for all the views => 
// the path of which is provided as the first param in the res.render() method in controllers.
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const db = require('./util/database');

app.use(bodyParser.urlencoded({
    extended: false
}));

// This gives access to the css file under public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // Export syntax (admin.js) => module.exports = router;
//app.use('/admin', adminRoutes.routes); // Export syntax (admin.js) => exports.routes = router;
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);