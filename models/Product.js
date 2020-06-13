// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
    // -- SQL table template
    // CREATE TABLE product (
    //   id INTEGER NOT NULL AUTO_INCREMENT,
    //   product_name VARCHAR(30) NOT NULL,
    //   price DECIMAL NOT NULL, 
    //   stock INTEGER NOT NULL, 
    //   category_id INT NOT NULL,
    //   PRIMARY KEY(id),
    //   FOREIGN KEY(category_id)
    //       REFERENCES category(id)
    //   );
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
