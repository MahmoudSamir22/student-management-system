const router = require("express").Router();
const {
  login,
  getLoggedUserData,
  auth,
  forgetPassword
} = require("../controllers/authController");

router.post('/forgetPassword', forgetPassword)
router.post("/login", login);
router.get("/getMe", auth, getLoggedUserData);

module.exports = router;
