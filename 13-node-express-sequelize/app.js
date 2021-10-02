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

// sequelize.sync({force:true}) in the sync() method syncs all your models 
// Use {force:true} object whenever you want to synchronise changes to your model with the database.
// Backup your DB before applying {force:true} 
// Update your data upload scripts to re-adjust to new table relations or modifications to your existing schemas and then
// Use {force:true} object in sync() which will restart the server (since we have used nodemon in npm start script).
// Once the database schemas have been updated with your new sequelize model, reload the data carefully with your updated scripts
// Then comment back the sequelize.sync({force:true}) as below
// TODO: Need a validation check at the time of commiting code changes to Git to ensure the line sequelize.sync({force:true}) is always commented 

//sequelize.sync({force:true})
sequelize.sync()
    .then(result => {
        //console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

// ** Additional Notes on sequelize.sync({force:true})
// Was getting error something along the lines of .... default value error for the id field in Product table.
// It was because of incorrect spelling of autoIncrement key in the Product model. 
// Used {force:true} strategy successfully to resync the sequelize model with my MySQL DB after correcting the spelling.