const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "app_pass$01",
    database: 'node-complete'
});

module.exports = pool.promise();