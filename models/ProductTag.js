const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
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
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // foreign key reference
        references: {
          model: 'product',
          key: 'id'
        }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // foreign key reference
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
      // -- SQL table template
      // CREATE TABLE product_tag (
      //   id INTEGER NOT NULL AUTO_INCREMENT,
      //   product_id NOT NULL,
      //   tag_id INT NULL,
      //   PRIMARY KEY(id),
      //   FOREIGN KEY (product_id)
      //       REFERENCES product(id),
      //   FOREIGN KEY (tag_id)
      //       REFERENCES tag(id)
      //   );
  
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'product_tag',
    }
);

module.exports = ProductTag;
