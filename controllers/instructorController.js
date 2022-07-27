const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Grades = require("../models/gradesModel");
const Course = require("../models/courseModel");
const Task = require('../models/taskModel')

exports.getGradesForSpecificCourse = asyncHandler(async (req, res, next) => {
  const grades = await Grades.find({ course: req.body.course });
  if (!grades) {
    return next(new ApiError("No grades found for this course ", 404));
  }
  res
    .status(200)
    .json({ status: "Success", result: grades.length, data: grades });
});

exports.getMyCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({ instructor: req.user._id });
  if (!courses) {
    return next(new ApiError("You don't have any courses", 404));
  }
  res
    .status(200)
    .json({ status: "Success", result: courses.length, data: courses });
});

exports.getMyTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ instructor: req.user._id });
  if (!tasks) {
    return next(new ApiError("You don't have any tasks", 404));
  }
  res
    .status(200)
    .json({ status: "Success", result: tasks.length, data: tasks });
});