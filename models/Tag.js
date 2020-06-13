const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
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
    tag_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [30]
      }
    }
  },
  // -- SQL table template
  // CREATE TABLE tag (
  //   id INTEGER NOT NULL AUTO_INCREMENT,
  //   tag_name VARCHAR(30) NULL,
  //   PRIMARY KEY(id)
  //   );

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
