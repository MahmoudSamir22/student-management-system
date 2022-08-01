const router = require("express").Router();

const {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  uploadTaskContent,
} = require("../controllers/taskController");

const {
  addTaskValidator,
  updateTaskValidator,
  getTaskValidator,
  deleteTaskValidator,
} = require("../utils/validator/taskValidator");

const { auth, allowedTo } = require("../controllers/authController");

router
  .route("/")
  .post(
    auth,
    allowedTo("instructor"),
    uploadTaskContent,
    addTaskValidator,
    addTask
  )
  .get(getTasks);

router
  .route("/:id")
  .get(getTaskValidator, getTask)
  .put(
    auth,
    allowedTo("instructor"),
    uploadTaskContent,
    updateTaskValidator,
    updateTask
  )
  .delete(auth, allowedTo("instructor"), deleteTaskValidator, deleteTask);

module.exports = router;
