const router = require('express').Router();
const { Category, Product } = require('../../models');

// Category Routes
// =============================================================
// ---  The `/api/categories` endpoint

router.get('/api/Categories', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({}).then(dbCategory => {
    res.json(dbCategory);
  });
});

router.get('/api/Category/:id', (req, res) => {
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

router.post('/api/Category', (req, res) => {
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

router.put('/api/Category/:id', (req, res) => {
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


router.delete('/api/Category/:id', (req, res) => {
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
