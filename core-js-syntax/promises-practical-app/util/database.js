const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-promise-demo', 'root', 'app_pass$01', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;