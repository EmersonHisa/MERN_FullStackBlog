const router = require("express").Router();
const Category = require("../models/Category");

//add category
router.post("/", async (req, res, next) => {
  const category = new Category(req.body);
  try {
    const savedCat = await category.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
