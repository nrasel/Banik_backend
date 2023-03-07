const {
  createProduct,
  getaProduct,
  getallProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/:id", getaProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getallProducts);

module.exports = router;
