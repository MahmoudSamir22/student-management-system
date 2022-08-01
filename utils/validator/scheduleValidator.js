const { body, check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Schedule = require("../../models/scheduleModel");
const Course = require("../../models/courseModel");

exports.addScheduleValidator = [
  body("classLevel")
    .notEmpty()
    .withMessage("Class Level is required")
    .isNumeric()
    .isLength({ min: 1, max: 4 })
    .withMessage("Class Level must be between 0 and 4"),
  body("section")
    .notEmpty()
    .withMessage("Section is required")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("Section can't be lower than 1"),
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
  body("duration")
    .notEmpty()
    .withMessage("Course duration is required")
    .isNumeric()
    .isLength({ min: 0, max: 4 })
    .withMessage("Course duration must be between 0 and 4 hours"),
  body("start")
    .notEmpty()
    .withMessage("Course start is required")
    .isNumeric()
    .isLength({ min: 0, max: 24 })
    .withMessage("Course start must be between 0 and 24 hours"),
  body("end")
    .notEmpty()
    .withMessage("Course end is required")
    .isNumeric()
    .isLength({ min: 0, max: 24 })
    .withMessage("Course end must be between 0 and 24 hours")
    .custom((val, { req }) => {
      if (val < req.body.start) {
        throw new Error("Course can't end before it starts");
      }
      if (val - req.body.start != req.body.duration) {
        throw new Error(
          "Some thing wronge with the course duration or start and end date"
        );
      }
    }),
  body("day").custom((val) => {
    const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    if (!days.includes(val)) {
      throw new Error(
        "Day must be in this array and it's case sensitive: " + days
      );
    }
  }),
  validatorMiddleware,
];

exports.updateScheduleValidator = [
  check("id").isMongoId().withMessage("This id is not valid"),
  body("classLevel")
    .optional()
    .isNumeric()
    .isLength({ min: 1, max: 4 })
    .withMessage("Class Level must be between 0 and 4"),
  body("section")
    .optional()
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("Section can't be lower than 1"),
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
  body("duration")
    .optional()
    .isNumeric()
    .isLength({ min: 0, max: 4 })
    .withMessage("Course duration must be between 0 and 4 hours"),
  body("start")
    .optional()
    .isNumeric()
    .isLength({ min: 0, max: 24 })
    .withMessage("Course start must be between 0 and 24 hours"),
  body("end")
    .optional()
    .isNumeric()
    .isLength({ min: 0, max: 24 })
    .withMessage("Course end must be between 0 and 24 hours")
    .custom(async (val, { req }) => {
        const schedule = await Schedule.findById(req.params.id)
      if (val < schedule.start) {
        throw new Error("Course can't end before it starts");
      }
      if (val - schedule.start != schedule.duration) {
        throw new Error(
          "Some thing wronge with the course duration or start and end date"
        );
      }
    }),
  body("day").custom((val) => {
    const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    if (!days.includes(val)) {
      throw new Error(
        "Day must be in this array and it's case sensitive: " + days
      );
    }
  }),
  validatorMiddleware,
];

exports.getScheduleValidator = [
  check("id").isMongoId().withMessage("This id is not valid"),
  validatorMiddleware,
];

exports.deleteScheduleValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
