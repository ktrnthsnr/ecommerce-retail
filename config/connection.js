const Sequelize = require('sequelize');

// imported env module
const env = require('../env');

// dotenv 
require('dotenv').config();

// create connection to our mysql db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
      //  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    : new Sequelize('ecommerce_db', 'root', env.password,
    {
      host: 'localhost',
      dialect: 'mysql',
      // port: 3001, //added
      dialectOptions: {
        decimalNumbers: true,
      },
    });

//export
module.exports = sequelize;
