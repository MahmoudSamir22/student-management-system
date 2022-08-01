const router = require("express").Router();

const {
  addCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  uploadCourseContent,
} = require("../controllers/courseController");

const {
  addCourseValidator,
  updateCourseValidator,
  getCourseValidator,
  deleteCourseValidator,
} = require("../utils/validator/courseValidator");

const { auth, allowedTo } = require("../controllers/authController");

router
  .route("/")
  .post(
    auth,
    allowedTo("admin"),
    uploadCourseContent,
    addCourseValidator,
    addCourse
  )
  .get(getCourses);

router
  .route("/:id")
  .get(getCourseValidator, getCourse)
  .put(
    auth,
    allowedTo("instructor", "admin"),
    updateCourseValidator,
    updateCourse
  )
  .delete(auth, allowedTo("admin"), deleteCourseValidator, deleteCourse);

module.exports = router;
