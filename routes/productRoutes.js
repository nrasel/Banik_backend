const { createProduct } = require("../controllers/ProductController");

const router = require("express").Router();

router.post("/", createProduct);

module.exports = router;
