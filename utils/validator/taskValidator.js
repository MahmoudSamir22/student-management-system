const { body, check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Course = require("../../models/courseModel");

exports.addTaskValidator = [
  body("title").notEmpty().withMessage("Task title is required"),
  body("course")
    .notEmpty()
    .withMessage("Course id is required")
    .isMongoId()
    .withMessage("Please enter a valid id")
    .custom(async (val) => {
      const course = await Course.findById(val);
      if (!course) {
        throw new Error("Course not found");
      }
    }),
  body("points")
    .isNumeric()
    .withMessage("Points Should be a number")
    .notEmpty()
    .withMessage("Points is required")
    .isLength({ min: 0 })
    .withMessage("Points can't be lower than 0"),
  body("description").notEmpty().withMessage("Task description is required"),
  validatorMiddleware,
];

exports.updateTaskValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  body("title").optional(),
  body("course")
    .optional()
    .isMongoId()
    .withMessage("Please enter a valid id")
    .custom(async (val) => {
      const course = await Course.findById(val);
      if (!course) {
        throw new Error("Course not found");
      }
    }),
  body("points")
    .isNumeric()
    .withMessage("Points Should be a number")
    .optional()
    .isLength({ min: 0 })
    .withMessage("Points can't be lower than 0"),
  body("description").optional(),
  validatorMiddleware,
];

exports.getTaskValidator = [
  check("id").isMongoId().withMessage("This id is not valid"),
  validatorMiddleware,
];

exports.deleteTaskValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
