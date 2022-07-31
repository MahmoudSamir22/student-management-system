const factory = require("./factoryHandler");
const Grades = require("../models/gradesModel");

// @desc Add New Grades
// @route POST /api/v1/grades
// @access Private/Instructor
exports.addGrades = factory.createOne(Grades);

// @desc Get All Grades
// @route GET /api/v1/grades
// @access Public
exports.getGrades = factory.getAll(Grades);

// @desc Update Spesific Grade
// @route PUT /api/v1/grades/id
// @access Private/Instructor
exports.updateGrade = factory.updateOne(Grades);

// @desc Delete Spesific Grade
// @route DELETE /api/v1/grades/id
// @access Private/Instructor
exports.deleteGrade = factory.deleteOne(Grades);
