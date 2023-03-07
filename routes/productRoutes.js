const {
  createProduct,
  getaProduct,
  getallProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", authMiddleWare, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleWare, isAdmin, updateProduct);
router.delete("/:id", authMiddleWare, isAdmin, deleteProduct);
router.get("/", getallProducts);

module.exports = router;
