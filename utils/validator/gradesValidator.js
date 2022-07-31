const { body, check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const Course = require("../../models/courseModel");

exports.addGradesValidator = [
  body("course")
    .notEmpty()
    .withMessage("Course id is required")
    .isMongoId()
    .withMessage("Please enter a valid id"),
  body("points")
    .isNumeric()
    .withMessage("Points Should be a number")
    .notEmpty()
    .withMessage("Points is required")
    .isLength({ min: 0 })
    .withMessage("Points can't be lower than 0")
    .custom(async (val, { req }) => {
      const course = await Course.findById(req.body.course);
      if (!course) {
        throw new Error("Course not found");
      }
      if (val > course.fullMarks) {
        throw new Error("Points can't be higher than the fullMarks");
      }
    }),
  body("student")
    .notEmpty()
    .withMessage("Course id is required")
    .isMongoId()
    .withMessage("Please enter a valid id")
    .custom(async (val, { req }) => {
      const user = await User.findOne({
        _id: val,
        courses: { $in: req.body.course },
      });
      if (!user) {
        throw new Error("No user with this id enrolled in the course");
      }
    }),
  validatorMiddleware,
];

exports.updateGradeValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  body("course").optional().isMongoId().withMessage("Please enter a valid id"),
  body("points")
    .isNumeric()
    .withMessage("Points Should be a number")
    .optional()
    .isLength({ min: 0 })
    .withMessage("Points can't be lower than 0")
    .custom(async (val, { req }) => {
      const course = await Course.findById(req.body.course);
      if (!course) {
        throw new Error("Course not found");
      }
      if (val > course.fullMarks) {
        throw new Error("Points can't be higher than the fullMarks");
      }
    }),
  body("student")
    .optional()
    .isMongoId()
    .withMessage("Please enter a valid id")
    .custom(async (val, { req }) => {
      const user = await User.findOne({
        _id: val,
        courses: { $in: req.body.course },
      });
      if (!user) {
        throw new Error("No user with this id enrolled in the course");
      }
    }),
  validatorMiddleware,
];

exports.deleteGradeValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
