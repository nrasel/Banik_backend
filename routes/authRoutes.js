const {
  createUser,
  loginController,
  getAllUser,
  getAUser,
  deleteAUser,
  updatedAUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/login", loginController);
router.get("/all-users", getAllUser);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);
router.put("/:id", updatedAUser);

module.exports = router;
