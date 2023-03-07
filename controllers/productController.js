const asyncHandler = require("express-async-handler");
const productModels = require("../models/productModels");
const slugify = require("slugify");

// create product
module.exports.createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await productModels.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//update product
module.exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await productModels.findOneAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// delete product
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await productModels.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// get a product
module.exports.getaProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findaProduct = await productModels.findById(id);
    res.json(findaProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// get all products
module.exports.getallProducts = asyncHandler(async (req, res) => {
  const queryObj = req.query;
  console.log(queryObj);
  try {
    // searching product using category
    const getAllProducts = await productModels
      .where("category")
      .equals(req.query.category);
    res.json(getAllProducts);
  } catch (error) {
    throw new Error(error);
  }
});
