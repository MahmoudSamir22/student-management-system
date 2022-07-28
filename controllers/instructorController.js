const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Grades = require("../models/gradesModel");
const Course = require("../models/courseModel");
const Task = require("../models/taskModel");
const Schedule = require("../models/scheduleModel");

// @desc Get student Grades for specific course
// @route /api/v1/instructor/courseGrades
// @access Private/Instructor
exports.getGradesForSpecificCourse = asyncHandler(async (req, res, next) => {
  const grades = await Grades.find({ course: req.body.course });
  if (!grades) {
    return next(new ApiError("No grades found for this course ", 404));
  }
  res
    .status(200)
    .json({ status: "Success", result: grades.length, data: grades });
});

// @desc Get courses that belong to the logged instructor
// @route /api/v1/instructor/myCourses
// @access Private/Instructor
exports.getMyCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({ instructor: req.user._id });
  if (!courses) {
    return next(new ApiError("You don't have any courses", 404));
  }
  res
    .status(200)
    .json({ status: "Success", result: courses.length, data: courses });
});

// @desc Get tasks that belong to the logged instructor
// @route /api/v1/instructor/myTasks
// @access Private/Instructor
exports.getMyTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ instructor: req.user._id });
  if (!tasks) {
    return next(new ApiError("You don't have any tasks", 404));
  }
  res
    .status(200)
    .json({ status: "Success", result: tasks.length, data: tasks });
});

// @desc Get schedules that belong to the logged instructor
// @route /api/v1/instructor/myTasks
// @access Private/Instructor
exports.mySchedule = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({ instructor: req.user._id });
  const schedule = await Schedule.find({ course: { $in: courses } });
  res.status(200).json({ status: "success", data: schedule });
});
