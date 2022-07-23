const router = require("express").Router();

const {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { auth, allowedTo } = require("../controllers/authController");

router
  .route("/")
  .post(auth, allowedTo("instructor"), addTask)
  .get(getTasks);

router
  .route("/:id")
  .get(getTask)
  .put(auth, allowedTo("instructor"), updateTask)
  .delete(auth, allowedTo("instructor"), deleteTask);

module.exports = router;
