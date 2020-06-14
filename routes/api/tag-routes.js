const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Tag Routes
// =============================================================
// The `/api/tags` endpoint

// ============== VIEW ALL tags ==============
// find all tags, including its associated Product data
// Insomnia browser test, GET http://localhost:3001/api/tags
router.get('/', (req, res) => {  
  Tag.findAll({
    include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
              through:ProductTag, as: 'products'  // -- fix to LoadingError:
              }                                   // -- EagerLoadingError [SequelizeEagerLoadingError]: product is associated to tag using an alias. You must use the 'as' keyword to specify the alias within your include statement.
  }) 
  .then(dbTag => {
    if(!dbTag) {    // if no match
      res.status(404).json({message: "There were no results for this query."});
      return;
    }
    // render JSON
    res.json(dbTag);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});

// ============== VIEW ONE tag by ID ==============
  // find a single tag by its `id`, to include its associated Product data
// Insomnia browser test, GET http://localhost:3001/api/tags/1
router.get('/:id', (req, res) => {  
  Tag.findOne({
    where: {id: req.params.id},
    include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
              through:ProductTag, as: 'products'
             }
  })
  .then(dbTag => {
    if(!dbTag) {    // if no match
      res.status(404).json({message: "There were no results for this query."});
      return;
    }
    // render JSON
    res.json(dbTag);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});

// ============== CREATE tag ==============
// Insomnia browser test, POST http://localhost:3001/api/tags
router.post('/', (req, res) => {
  // create a new tag -- started code
  /* req.body should look like this...
    {
      "tag_name": "zebra"
    }
  */
 Tag.create(req.body)
    .then((tag) => {
      // if there's tags, we need to create pairings to bulk create in the Tag model
      if (req.body.tagIds.length) {
        const TagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id
          };
        });
        return TagID.bulkCreate(TagIdArr);
      }
      // if no tags, just respond
      res.status(200).json(tag);
    })
    .then((TagIds) => res.status(200).json(TagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// result, created ID 9
    // mysql> select * from tag;
    // +----+-------------+
    // | id | tag_name    |
    // +----+-------------+
    // |  1 | rock music  |
    // |  2 | pop music   |
    // |  3 | blue        |
    // |  4 | red         |
    // |  5 | green       |
    // |  6 | white       |
    // |  7 | gold        |
    // |  8 | pop culture |
    // |  9 | zebra       |


// ============== UPDATE tag by ID ==============
// Insomnia browser test, PUT http://localhost:3001/api/tags/12
// update a tag's name by its `id` value
   /* req.body should look like this...
    {
      "tag_name": "cow"
    }
    */
router.put('/:id', (req, res) => {
  Tag.update({
      tag_name: req.body.tag_name
    },{
      where: {id: req.params.id}
    })
    .then(dbTag => {
      if(!dbTag) {    // if no match
        res.status(404).json({message: "This update query is not valid."});
        return;
      }
      // render JSON
      res.json(dbTag);
    }) 
    .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
  });

  // result, updated ID 12 to cow
      //   mysql> select * from tag;
      // +----+-------------+
      // | id | tag_name    |
      // +----+-------------+
      // |  1 | rock music  |
      // |  2 | pop music   |
      // |  3 | blue        |
      // |  4 | red         |
      // |  5 | green       |
      // |  6 | white       |
      // |  7 | gold        |
      // |  8 | pop culture |
      // | 12 | cow         |
      // +----+-------------+


// ============== DELETE ==============
// Insomnia browser test, DELETE http://localhost:3001/api/tags/9
   // {
   //   "tag_id": 9
   // }
router.delete('/:id', (req, res) => {  
  Tag.destroy({
    where: {id: req.params.id}
  })
  .then(dbTag => {
    if(!dbTag) {    // if no match
      res.status(404).json({message: "Unable to delete."});
      return;
    }
    // render JSON
    res.json(dbTag);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});

// result, deleted ID 9
      // mysql> select * from tag;
      // +----+-------------+
      // | id | tag_name    |
      // +----+-------------+
      // |  1 | rock music  |
      // |  2 | pop music   |
      // |  3 | blue        |
      // |  4 | red         |
      // |  5 | green       |
      // |  6 | white       |
      // |  7 | gold        |
      // |  8 | pop culture |
      // +----+-------------+

//export
module.exports = router;
