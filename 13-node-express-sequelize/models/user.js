const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: Sequelize.STRING,
    address: Sequelize.STRING,
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;