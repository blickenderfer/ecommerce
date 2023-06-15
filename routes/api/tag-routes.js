const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//ALL BELOW NEEDS DEBUGGING/REVIEW
router.get('/', async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
  // unit 23 driver routes include model:product
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {id: req.params.id},
      include: [{model: Product}]
    })
    res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error)
  }

  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body)
    res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: {id: req.params.id}
    })
    res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error)
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {id: req.params.id}
    })
    if (!tag){
      res.status(404).json({message: "No tag found."})
      return;
    }
    return res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error)
  }
  // delete on tag by its `id` value
});

module.exports = router;
