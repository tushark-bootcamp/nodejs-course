const http = require('http');
const path = require('path');

const express = require('express');

const rootDir = require('./util/path');

const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');

const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));

// This gives access to the css file under public folder
app.use(express.static(path.join(__dirname, 'public')));

// Observe the difference betweeen 'adminRoutes.routesHandler' and 'shopRoutes' The exact same routes object is used in  different fashion due to how it is exported.
app.use('/admin', adminData.routes);
app.use(shopRoutes);

// Observe the difference in export syntax
// module.exports = router; => shopRoutes
// module.exports.routesHandler = router;  => adminRoutes

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, './', 'views', '404.html'));
    //res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);