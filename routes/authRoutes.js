const {
  createUser,
  loginController,
  getAllUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/login", loginController);
router.get("/all-users", getAllUser);

module.exports = router;
