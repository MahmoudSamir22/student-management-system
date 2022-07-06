const { body, check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Course = require("../../models/courseModel");

exports.addCourse = [
  body("name").notEmpty().withMessage("Course name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("duration")
    .notEmpty()
    .withMessage("duration is required")
    .isNumeric()
    .withMessage("duration is number"),
  validatorMiddleware(),
];

exports.updateCourseValidator = [
  check("id").isMongoId().withMessage("This id is not valid"),
  body("duration").optional().isNumeric().withMessage("duration is number"),
  validatorMiddleware(),
];

exports.getCourseValidator = [
  check("id").isMongoId().withMessage("This id is not valid"),
  validatorMiddleware(),
];
exports.deleteCourseValidator = [
  check("id").isMongoId().withMessage("This id is not valid"),
  validatorMiddleware(),
];
