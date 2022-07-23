const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Schedule = require("../models/scheduleModel");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

// @desc Get student schedule
// @route /api/v1/student/MySchedule
// @access Private/Student
exports.getMySchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.find({
    course: { $in: req.user.courses },
  });
  if (!schedule) {
    return next(new ApiError("Schedule not up yet", 404));
  }
  res.status(200).json({ status: "Success", data: schedule });
});

// @desc Get student courses
// @route /api/v1/student/MyCourses
// @access Private/Student
exports.getMyCourses = asyncHandler(async (req, res, next) => {
  if (!req.user.courses) {
    return next(new ApiError("This user does not have any courses yet", 404));
  }
  res.status(200).json({ status: "Success", data: req.user.courses });
});

// @desc Add courses to a  student
// @route /api/v1/student/addCourseToStudent
// @access Private/Admin
exports.addCourseToStudent = asyncHandler(async (req, res, next) => {
  const courses = req.body.course
  const userCourses = await User.findById(req.body.user)
  userCourses.courses.forEach((course) => {
    if(courses.includes(course._id.toString())){
      const index = courses.indexOf(course._id.toString())
      courses.splice(index, 1)
    }
  })
  const user = await User.findByIdAndUpdate(
    req.body.user,
    { $push: { courses: courses } },
    { new: true }
  );
  res.status(200).json({ status: "Success", data: user });
});

// @desc Remove courses to a  student
// @route /api/v1/student/removeCourseFromStudent
// @access Private/Admin
exports.removeCourseFromStudent = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.body.user,
    { $pull: { courses: req.body.course } },
    { new: true }
  );
  res.status(200).json({ status: "Success", data: user });
});
