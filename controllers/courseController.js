const asyncHandler = require("express-async-handler");

const {uploadSinglePDF} = require('../middlewares/uploadFilesMiddleWare')
const ApiError = require("../utils/apiErrors");
const Course = require("../models/courseModel");

// @desc Middleware to handle file uploads
// @route Middleware
// @access Private/Instructor
exports.uploadCourseContent = uploadSinglePDF('content', 'courses')

// @desc Add New Course
// @route POST /api/v1/courses
// @access Private/Instructor
exports.addCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);
  await course.save();
  res.status(201).json({ status: "Success", data: course });
});

// @desc Get All Courses
// @route GET /api/v1/courses
// @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find();
  res
    .status(200)
    .json({ status: "Success", result: courses.length, data: courses });
});

// @desc Get Spesific Course
// @route GET /api/v1/courses/id
// @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ApiError(`Can't find course with this id: ${req.params.id}`)
    );
  }
  res.status(200).json({ status: "Success", data: course });
});

// @desc Update Spesific Course
// @route PUT /api/v1/courses/id
// @access Private/Instructor
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ApiError(`Can't find course with this id: ${req.params.id}`)
    );
  }
  if (req.user.role === "instructor") {
    if (req.user._id !== course.instructor) {
      return next(new ApiError(`You can't update this course. It's not yours`));
    }
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ status: "Success", data: course });
});

// @desc Delete Spesific Course
// @route DELETE /api/v1/courses/id
// @access Private/Instructor
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(
      new ApiError(`Can't find course with this id: ${req.params.id}`)
    );
  }
  res.status(204).json();
});
