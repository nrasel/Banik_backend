const {
  createProduct,
  getaProduct,
  getallProducts,
} = require("../controllers/ProductController");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/:id", getaProduct);
router.get("/", getallProducts);

module.exports = router;
