const router = require("express").Router();

const {
  getMySchedule,
  addCourseToStudent,
  getMyCourses,
  removeCourseFromStudent,
} = require("../controllers/studentController");

const { auth, allowedTo } = require("../controllers/authController");

router.get("/MySchedule", auth, allowedTo("student"), getMySchedule);

router.get("/MyCourses", auth, allowedTo("student"), getMyCourses);

router.put("/addCourseToStudent", auth, allowedTo("admin"), addCourseToStudent);

router.put(
  "/removeCourseFromStudent",
  auth,
  allowedTo("admin"),
  removeCourseFromStudent
);

module.exports = router;
