// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// -- Foreign Key associations more info: https://sequelize.org/v3/docs/associations/

// Products belongsTo Category
Product.belongsTo(Category, { foreignKey: 'category_id' }
); 

// Categories have many Products
Category.hasMany(Product, { foreignKey: 'category_id' }
);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, 
  { through: ProductTag, as:'products', foreignKey: 'product_id' }
  );

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, 
  { through: ProductTag, as: 'products', foreignKey: 'tag_id' }
  );

// export
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
