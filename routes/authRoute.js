const router = require("express").Router();
const {
  login,
  getLoggedUserData,
  auth,
  forgetPassword,
  verifyResetCode,
  resetPassword,
} = require("../controllers/authController");

router.post("/forgetPassword", forgetPassword);
router.post("/login", login);
router.get("/getMe", auth, getLoggedUserData);
router.get("/verifyResetCode", verifyResetCode);
router.post("/resetPassword", resetPassword);

module.exports = router;
