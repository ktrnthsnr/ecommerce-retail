const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Tag Routes
// =============================================================
// The `/api/tags` endpoint

router.get('/api/Tags', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({}).then(dbTag => {
    res.json(dbTag);
  });
});

router.get('/api/Tag/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    }
  }).then(dbTag => {
    res.json(dbTag);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "zebra"
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

router.put('/api/Tags:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
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
  ).then(dbTag => {
    res.json(dbTag);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbTag => {
    res.json(dbTag);
  });
});

module.exports = router;
