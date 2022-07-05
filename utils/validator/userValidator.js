const { body, check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.addUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom((val) => {
      User.findOne({ email: val }).then((user) => {
        if (user) return Promise.reject(new Error("Email already exists"));
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password must be between 6 and 20 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),
  body("PasswordConfirmation")
    .notEmpty()
    .withMessage("Password Confirmation is required"),
  body("phone")
    .isMobilePhone("ar-EG")
    .optional()
    .withMessage("Please enter a valid egyptian phone number"),
  validatorMiddleware(),
];

exports.updateUserValidator = [
  body("email")
    .optional()
    .custom((val) => {
      User.findOne({ email: val }).then((user) => {
        if (user) return Promise.reject(new Error("Email already exists"));
      });
    }),
  body("phone")
    .isMobilePhone("ar-EG")
    .optional()
    .withMessage("Please enter a valid egyptian phone number"),
  validatorMiddleware(),
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("This id is not valid"),
  validatorMiddleware(),
];
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("This id is not valid"),
  validatorMiddleware(),
];
