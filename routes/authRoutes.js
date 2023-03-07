const {
  createUser,
  loginController,
  getAllUser,
  getAUser,
  deleteAUser,
  updatedAUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logOut,
  updatePassword,
} = require("../controllers/userController");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", createUser);
router.put("/password", authMiddleWare, updatePassword);
router.post("/login", loginController);
router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logOut);

router.get("/:id", authMiddleWare, isAdmin, getAUser);
router.delete("/:id", deleteAUser);
router.put("/edit-user", authMiddleWare, updatedAUser);
router.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unblockUser);

module.exports = router;
