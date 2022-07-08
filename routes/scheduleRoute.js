const router = require("express").Router();

const {
  addSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");
const { auth, allowedTo } = require("../controllers/authController");

router
  .route("/")
  .post(auth, allowedTo("admin"), addSchedule)
  .get(getSchedules);

router
  .route("/:id")
  .get(getSchedule)
  .put(auth, allowedTo("admin"), updateSchedule)
  .delete(auth, allowedTo("admin"), deleteSchedule);

module.exports = router;
