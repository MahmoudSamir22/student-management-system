const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Grades = require("../models/gradesModel");


// @desc Add New Grades
// @route POST /api/v1/grades
// @access Private/Instructor
exports.addGrades = asyncHandler(async (req, res, next) => {
  const grade = await Grades.create(req.body);
  await grade.save();
  res.status(201).json({ status: "Success", data: grade });
});


// @desc Get All Grades
// @route GET /api/v1/grades
// @access Public
exports.getGrades = asyncHandler(async (req, res, next) => {
  const grades = await Grades.find({ course: req.body.course });
  if (!grades) {
    return next(new ApiError("No Grades for this course"));
  }
  res
    .status(201)
    .json({ status: "Success", result: grades.length, data: grade });
});

// @desc Update Spesific Grade
// @route PUT /api/v1/grades/id
// @access Private/Instructor
exports.updateGrade = asyncHandler(async (req, res, next) => {
  const grade = await Grades.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res
    .status(201)
    .json({ status: "Success", data: grade });
});

// @desc Delete Spesific Grade
// @route DELETE /api/v1/grades/id
// @access Private/Instructor
exports.deleteGrade = asyncHandler(async (req, res, next) => {
    const grade = await Grades.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ status: "Success", data: grade });
  });
  
