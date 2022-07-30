const asyncHandler = require("express-async-handler");

const {uploadSinglePDF} = require('../middlewares/uploadFilesMiddleWare')
const factory = require('./factoryHandler')
const Course = require("../models/courseModel");

// @desc Middleware to handle file uploads
// @route Middleware
// @access Private/Instructor
exports.uploadCourseContent = uploadSinglePDF('content', 'courses')

// @desc Add New Course
// @route POST /api/v1/courses
// @access Private/Instructor
exports.addCourse = factory.createOne(Course)

// @desc Get All Courses
// @route GET /api/v1/courses
// @access Public
exports.getCourses = factory.getAll(Course)

// @desc Get Spesific Course
// @route GET /api/v1/courses/id
// @access Public
exports.getCourse = factory.getOne(Course)

// @desc Update Spesific Course
// @route PUT /api/v1/courses/id
// @access Private/Instructor
exports.updateCourse = factory.updateOne(Course)

// @desc Delete Spesific Course
// @route DELETE /api/v1/courses/id
// @access Private/Instructor
exports.deleteCourse = factory.deleteOne(Course)
