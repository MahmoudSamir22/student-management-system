const router = require("express").Router();

const {
  addSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

const {
  addScheduleValidator,
  updateScheduleValidator,
  getScheduleValidator,
  deleteScheduleValidator,
} = require("../utils/validator/scheduleValidator");

const { auth, allowedTo } = require("../controllers/authController");

router
  .route("/")
  .post(auth, allowedTo("admin"), addScheduleValidator, addSchedule)
  .get(getSchedules);

router
  .route("/:id")
  .get(getScheduleValidator, getSchedule)
  .put(auth, allowedTo("admin"), updateScheduleValidator, updateSchedule)
  .delete(auth, allowedTo("admin"), deleteScheduleValidator, deleteSchedule);

module.exports = router;
