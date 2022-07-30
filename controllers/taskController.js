const asyncHandler = require("express-async-handler");

const { uploadSinglePDF } = require("../middlewares/uploadFilesMiddleWare");
const factory = require("./factoryHandler");
const ApiError = require("../utils/apiErrors");
const Task = require("../models/taskModel");

// @desc Middleware to handle file uploads
// @route Middleware
// @access Private/Instructor
exports.uploadTaskContent = uploadSinglePDF("content", "tasks");

// @desc Add New Task
// @route POST /api/v1/tasks
// @access Private/Instructor
exports.addTask = factory.createOne(Task, "Task");

// @desc Get All Tasks
// @route GET /api/v1/tasks
// @access Public
exports.getTasks = factory.getAll(Task);

// @desc Get Spesific Task
// @route GET /api/v1/tasks/:id
// @access Public
exports.getTask = factory.getOne(Task);

// @desc Update Spesific Task
// @route PUT /api/v1/courses/id
// @access Private/Instructor
exports.updateTask = factory.updateOne(Task);

// @desc Delete Spesific Task
// @route DELETE /api/v1/tasks/id
// @access Private/Instructor
exports.deleteTask = factory.deleteOne(Task);
