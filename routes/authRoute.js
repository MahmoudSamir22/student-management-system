const router = require("express").Router();
const {
  login,
  getLoggedUserData,
  auth,
} = require("../controllers/authController");

router.post("/login", login);
router.get("/getMe", auth, getLoggedUserData);

module.exports = router;
