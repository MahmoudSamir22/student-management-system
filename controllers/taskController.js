const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Task = require("../models/taskModel");

// @desc Add New Task
// @route POST /api/v1/tasks
// @access Private/Instructor
exports.addTask = asyncHandler(async (req, res, next) => {
  const task = await Task.create(req.body);
  await task.save();
  res.status(201).json({ status: "Success", data: task });
});

// @desc Get All Tasks
// @route GET /api/v1/tasks
// @access Public
exports.getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find();
  res
    .status(200)
    .json({ status: "Success", result: tasks.length, data: tasks });
});

// @desc Get Spesific Task
// @route GET /api/v1/tasks/:id
// @access Public
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(
      new ApiError(`Can't find task with this id: ${req.params.id}`)
    );
  }
  res.status(200).json({ status: "Success", data: task });
});

// @desc Update Spesific Task
// @route PUT /api/v1/courses/id
// @access Private/Instructor
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);
  if (!task) {
    return next(
      new ApiError(`Can't find task with this id: ${req.params.id}`)
    );
  }
  if (req.user.role === "instructor") {
    if (req.user._id !== task.instructor) {
      return next(new ApiError(`You can't update this task. It's not yours`));
    }
  }
  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ status: "Success", data: task });
});

// @desc Delete Spesific Task
// @route DELETE /api/v1/tasks/id
// @access Private/Instructor
exports.deleteTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(
      new ApiError(`Can't find task with this id: ${req.params.id}`)
    );
  }
  res.status(204).json();
});
