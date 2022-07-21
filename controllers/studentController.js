const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Schedule = require("../models/scheduleModel");
const Course = require('../models/courseModel')
const User = require('../models/userModel')

exports.getMySchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.find({
    classLevel: req.user.studentLevel,
    section: req.user.section,
  });
  if(!schedule) {
    return next(new ApiError('Schedule not up yet', 404))
  }
  res.status(200).json({status: 'Success', data: schedule})
});

exports.getMyCourses = asyncHandler(async (req, res, next) => {
  if(!req.user.courses){
    return next(new ApiError('This user does not have any courses yet', 404))
  }
  res.status(200).json({status: 'Success', data: req.user.courses})
})

exports.addCourseToMyList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, {$push: {courses: req.body.course}}, {new: true})
  res.status(200).json({status: 'Success', data: user})
})