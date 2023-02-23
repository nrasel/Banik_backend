const asyncHandler = require("express-async-handler");

module.exports.createProduct = asyncHandler(async (req, res) => {
  res.json({
    message: "It's product controller",
  });
});
