const router = require('express').Router();
const { Category, Product } = require('../../models');

// Category Routes
// =============================================================
// ---  The `/api/categories` endpoint

// --------------------- is it working test ---------------------  //
        // router.get('/', (req, res) => {
        //   // find all categories
        //   // res.json("hello"); // router test    
        //   Category.findAll({}).then(dbCategory => {
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
router.get('/', (req, res) => {
  Category.findAll({include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}
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


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    res.json(dbCategory);
  });
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "Socks"
    }
  */
  console.log(req.body);
  Category.create({
    title: req.body.title,
    body: req.body.body,
    category: req.body.category
  }).then(dbCategory => {
    res.json(dbCategory);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbCategory => {
    res.json(dbCategory);
  });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    res.json(dbCategory);
  });
});

module.exports = router;
