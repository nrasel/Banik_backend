const {
  createUser,
  loginController,
  getAllUser,
  getAUser,
  deleteAUser,
  updatedAUser,
} = require("../controllers/userController");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/login", loginController);
router.get("/all-users", getAllUser);
router.get("/:id", authMiddleWare, isAdmin, getAUser);
router.delete("/:id", deleteAUser);
router.put("/edit-user", authMiddleWare, updatedAUser);

module.exports = router;
