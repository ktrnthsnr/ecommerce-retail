require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  // : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, 
    : new Sequelize('ecommerce_db', 'root', '..', 
    {
      host: 'localhost',
      dialect: 'mysql',
      // port: 3001, //addednpn
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
