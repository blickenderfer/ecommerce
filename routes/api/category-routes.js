const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// This route is /api/categories/
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    }) 
    res.status(200).json(categoryData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {id: req.params.id},
      include: [{model: Product}]
    })
    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {id: req.params.id}
    })
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
  // update a category by its `id` value
});

//NEEDS REVIEW
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {id: req.params.id}
    })
    if (!category){
      res.status(404).json({message: "No category found."})
      return;
    }
    return res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
  // delete a category by its `id` value
});

module.exports = router;
