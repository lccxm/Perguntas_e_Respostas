const sequelize = require("sequelize");
require('dotenv').config({path: './database.env'});

const connection = new sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS,{
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;