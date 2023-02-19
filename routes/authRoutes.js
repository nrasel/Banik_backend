const {
  createUser,
  loginController,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/login", loginController);

module.exports = router;
