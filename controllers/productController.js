const asyncHandler = require("express-async-handler");
const productModels = require("../models/productModels");

// create product
module.exports.createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await productModels.create(req.body);
    res.json(newProduct);
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
  try {
    const getAllProducts = await productModels.find({});
    res.json(getAllProducts);
  } catch (error) {
    throw new Error(error);
  }
});
