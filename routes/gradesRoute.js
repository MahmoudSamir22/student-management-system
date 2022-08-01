const router = require("express").Router();

const {
  addGrades,
  getGrades,
  updateGrade,
  deleteGrade,
} = require("../controllers/greadesController");

const {
  addGradesValidator,
  updateGradeValidator,
  deleteGradeValidator,
} = require("../utils/validator/gradesValidator");

const { auth, allowedTo } = require("../controllers/authController");

router
  .route("/")
  .post(auth, allowedTo("admin"), addGradesValidator, addGrades)
  .get(getGrades);

router
  .route("/:id")
  .put(
    auth,
    allowedTo("instructor", "admin"),
    updateGradeValidator,
    updateGrade
  )
  .delete(auth, allowedTo("admin"), deleteGradeValidator, deleteGrade);

module.exports = router;
