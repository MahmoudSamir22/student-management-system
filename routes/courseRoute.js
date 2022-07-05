const router = require("express").Router();

const {
  addCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { auth, allowedTo } = require("../controllers/authController");

router
  .route("/")
  .post(auth, allowedTo("instructor"), addCourse)
  .get(getCourses);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
