const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [30]
      }
    }
  },
    // -- SQL table template
    // CREATE TABLE category (
    //   id INTEGER NOT NULL AUTO_INCREMENT,
    //   category_name VARCHAR(30) NOT NULL,
    //   PRIMARY KEY(id)
    //   );
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
