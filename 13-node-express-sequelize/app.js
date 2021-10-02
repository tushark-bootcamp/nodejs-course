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
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

app.use(bodyParser.urlencoded({
    extended: false
}));

// This gives access to the css file under public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // Export syntax (admin.js) => module.exports = router;
//app.use('/admin', adminRoutes.routes); // Export syntax (admin.js) => exports.routes = router;
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

// This line syncs all your models 
// Strangely without the force:true object, kept getting default value error for the id field in Product table.
// Using force:true starts dropping table on very restart; therefore removed {force:true} from sync()
// And from that point on, the default value error disappeared even after removing {force:true} from the sync() methid call.
//sequelize.sync({force:true})
sequelize.sync()
    .then(result => {
        //console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });