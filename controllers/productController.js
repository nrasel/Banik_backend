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
  try {
    // filter product using price
    const queryObj = { ...req.query };
    const excludFields = ["page", "sort", "limit", "fields"];
    excludFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    // get=greate than || lte means less then
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = productModels.find(JSON.parse(queryStr));

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limit the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await productModels.countDocuments();
      if (skip >= productCount) throw new Error("This page does not exists");
    }

    console.log(page, limit, skip);

    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});
