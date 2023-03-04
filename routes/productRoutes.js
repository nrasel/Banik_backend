const {
  createProduct,
  getaProduct,
  getallProducts,
  updateProduct,
} = require("../controllers/ProductController");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/:id", getaProduct);
router.put("/:id", updateProduct);
router.get("/", getallProducts);

module.exports = router;
