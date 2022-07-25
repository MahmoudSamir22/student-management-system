const router = require("express").Router();

const {
  addGrades,
  getGrades,
  updateGrade,
  deleteGrade,
} = require("../controllers/greadesController");
const { auth, allowedTo } = require("../controllers/authController");

router
  .route("/")
  .post(auth, allowedTo("admin"), addGrades)
  .get(getGrades);

router
  .route("/:id")
  .put(auth, allowedTo("instructor", "admin"), updateGrade)
  .delete(auth, allowedTo("admin"), deleteGrade);

module.exports = router;
