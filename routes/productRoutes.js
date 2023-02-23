const {
  createProduct,
  getaProduct,
} = require("../controllers/ProductController");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/:id", getaProduct);

module.exports = router;
