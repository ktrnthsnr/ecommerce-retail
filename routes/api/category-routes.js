const router = require('express').Router();
const { Category, Product } = require('../../models');

// Category Routes
// =============================================================
// ---  The `/api/categories` endpoint

// --------------------- tests ---------------------  //
        // router.get('/', (req, res) => {
        //   // -- find all categories
        //   // console.log(req.body);
        //   // res.json("hello");    // router test    
        //   Category.findAll({}).then(dbCategory => {  // connection to mysql test - get all
        //     console.log(dbCategory);
        //     res.json(dbCategory);
        //   });
        // });

// ----------------- w/o if no match & err catch --------- //
    // // find all categories, including its associated Products
    // // -- with foreign key contraints
    // router.get('/', (req, res) => {
    //     Category.findAll({
    //       include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}
    //     }).then(dbCategory => {
    //       // console.log(dbCategory);
    //       res.json(dbCategory);
    //     });
    //   });

  
// find all categories, including its associated Products
// -- with foreign key contraints
    // Insomnia API endpoint test, GET http://localhost:3001/api/categories
router.get('/', (req, res) => {
  Category.findAll({
    include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}
  }) 
  .then(dbCategory => {
    if(!dbCategory) {    // if no match
      res.status(404).json({message: "There were no results for this query."});
      return;
    }
    // render JSON
    res.json(dbCategory);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});

// find one category by its `id` value, include its associated Products
  // Insomnia test, GET http://localhost:3001/api/categories/5
router.get('/:id', (req, res) => {  
  Category.findOne({
    where: {id: req.params.id},
    include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}
  }) 
  .then(dbCategory => {
    if(!dbCategory) {    // if no match
      res.status(404).json({message: "There were no results for this query."});
      return;
    }
    // render JSON
    res.json(dbCategory);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});


// create a new category
  // Insomnia test, POST  http://localhost:3001/api/categories
  /* req.body should look like this...
    {
      "category_name": "Mittens"
    }
  */
 router.post('/', (req, res) => {
  Category.create({
      category_name: req.body.category_name
  })
  .then(dbCategory => {
    res.json(dbCategory);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});

// -- result shows ID 6 added, Mittens

          // mysql> select * from category;
          // +----+---------------+
          // | id | category_name |
          // +----+---------------+
          // |  1 | Shirts        |
          // |  2 | Shorts        |
          // |  3 | Music         |
          // |  4 | Hats          |
          // |  5 | Shoes         |
          // |  6 | Mittens       |
          // +----+---------------+


// update a category by its `id` value
    // Insomnia test, PUT http://localhost:3001/api/categories/6
    /* req.body should look like this...
        {
          "category_name": "Belts"
        }
      */
router.put('/:id', (req, res) => {
  Category.update({
      category_name: req.body.category_name
    },{
      where: {id: req.params.id}
    })
    .then(dbCategory => {
      if(!dbCategory) {    // if no match
        res.status(404).json({message: "This update query is not valid."});
        return;
      }
      // render JSON
      res.json(dbCategory);
    }) 
    .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
  });

  // -- result, updated ID 6 to Belts

        //   mysql> select * from category;
        // +----+---------------+
        // | id | category_name |
        // +----+---------------+
        // |  1 | Shirts        |
        // |  2 | Shorts        |
        // |  3 | Music         |
        // |  4 | Hats          |
        // |  5 | Shoes         |
        // |  6 | Belts         |
        // +----+---------------+

// delete a category by its `id` value
    // Insomnia test, DELETE http://localhost:3001/api/categories/6
    //  req.body should look like this...
    // {
    //   "category_name": "Belts"
    // }
    
router.delete('/:id', (req, res) => {  
  Category.destroy({
    where: {id: req.params.id}
  })
  .then(dbCategory => {
    if(!dbCategory) {    // if no match
      res.status(404).json({message: "Unable to delete."});
      return;
    }
    // render JSON
    res.json(dbCategory);
  }) 
  .catch(err => {console.log(err);res.status(500).json(err);})   // catch error
});

// -- result in mysql db, no more ID 6
      // mysql> select * from category;
      // +----+---------------+
      // | id | category_name |
      // +----+---------------+
      // |  1 | Shirts        |
      // |  2 | Shorts        |
      // |  3 | Music         |
      // |  4 | Hats          |
      // |  5 | Shoes         |
      // +----+---------------+

// export
module.exports = router;
