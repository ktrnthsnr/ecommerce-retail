const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Product Routes
// =============================================================
// The `/api/products` endpoint

// ==============  VIEW ALL products ==============
  // find all products, including its associated Category and Tag data
  // Insomnia browser test, GET http://localhost:3001/api/products
router.get('/', (req, res) => {  
  Product.findAll({
    include: {model: Category, attributes: ['id', 'category_name']}
  }) 
  .then(dbProduct => {
    if(!dbProduct) {    // if no match
      res.status(404).json({message: "There were no results for this query."});
      return;
    }
    // render JSON
    res.json(dbProduct);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});


// ============== VIEW ONE product ==============
  // find a single product by its `id`, including its associated Category and Tag data
  // Insomnia test URL:  GET http://localhost:3001/api/products/2
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {id: req.params.id}
    ,include: {model: Category, attributes: ['id', 'category_name']}
    ,include: {model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'products'}
  })
  .then(dbProduct => {
    if(!dbProduct) {    // if no match
      res.status(404).json({message: "There were no results for this query."});
      return;
    }
    // render JSON
    res.json(dbProduct);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});

// -- result
          // {
          //   "id": 2,
          //   "product_name": "Running Sneakers",
          //   "price": 90,
          //   "stock": 25,
          //   "category_id": 5,
          //   "products": [
          //     {
          //       "id": 6,
          //       "tag_name": "white",
          //       "product_tag": {
          //         "id": 4,
          //         "product_id": 2,
          //         "tag_id": 6
          //       }
          //     }
          //   ]
          // }


// ============== CREATE NEW product ==============
  // Insomnia URL test: POST http://localhost:3001/api/products
  /* req.body should look like this...
   {
      "product_name": "Baseball",
      "price": 200.00,
      "stock": 3,
      "tagIds": [1, 2, 3, 4]
    }
  */
router.post('/', (req, res) => {
  // -- starter code
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// result, ID 6 inserted
      // mysql> select * from product;
      // +----+---------------------------------------+-------+-------+-------------+
      // | id | product_name                          | price | stock | category_id |
      // +----+---------------------------------------+-------+-------+-------------+
      // |  1 | Plain T-Shirt                         |    15 |    14 |           1 |
      // |  2 | Running Sneakers                      |    90 |    25 |           5 |
      // |  3 | Branded Baseball Hat                  |    23 |    12 |           4 |
      // |  4 | Top 40 Music Compilation Vinyl Record |    13 |    50 |           3 |
      // |  5 | Cargo Shorts                          |    30 |    22 |           2 |
      // |  6 | Baseball                              |   200 |     3 |        NULL |
      // +----+---------------------------------------+-------+-------+-------------+


// ============== UPDATE product ==============
  // Insomnia URL test: PUT http://localhost:3001/api/products/6
    /* req.body should look like this...
    {
        "product_name": "Baseball Related",
        "price": 201.00,
        "stock": 4,
        "tagIds": [1, 2, 3, 4]
      }
    */
 router.put('/:id', (req, res) => {
  // update product data -- starter code
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// result, updated ID 6's data
      // mysql> select * from product;
      // +----+---------------------------------------+-------+-------+-------------+
      // | id | product_name                          | price | stock | category_id |
      // +----+---------------------------------------+-------+-------+-------------+
      // |  1 | Plain T-Shirt                         |    15 |    14 |           1 |
      // |  2 | Running Sneakers                      |    90 |    25 |           5 |
      // |  3 | Branded Baseball Hat                  |    23 |    12 |           4 |
      // |  4 | Top 40 Music Compilation Vinyl Record |    13 |    50 |           3 |
      // |  5 | Cargo Shorts                          |    30 |    22 |           2 |
      // |  6 | Baseball Related                      |   201 |     4 |           4 |
      // +----+---------------------------------------+-------+-------+-------------+


// ============== DELETE one product by its `id` value ==============
    // Insomnia URL test: DELETE http://localhost:3001/api/products/6
    /* req.body should look like this...
      {
          "product_id": 6
        }
    */
router.delete('/:id', (req, res) => {
  
  Product.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbProduct => {
    res.json(dbProduct);
  });
});

// result, deleted ID 6
    // mysql> select * from product;
    // +----+---------------------------------------+-------+-------+-------------+
    // | id | product_name                          | price | stock | category_id |
    // +----+---------------------------------------+-------+-------+-------------+
    // |  1 | Plain T-Shirt                         |    15 |    14 |           1 |
    // |  2 | Running Sneakers                      |    90 |    25 |        NULL |
    // |  3 | Branded Baseball Hat                  |    23 |    12 |           4 |
    // |  4 | Top 40 Music Compilation Vinyl Record |    13 |    50 |           3 |
    // |  5 | Cargo Shorts                          |    30 |    22 |           2 |
    // |  6 | Baseball Related                      |   201 |     4 |           4 |
    // |  7 | Baseball                              |   200 |     3 |        NULL |


    // export
module.exports = router;
