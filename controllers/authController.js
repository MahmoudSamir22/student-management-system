const crypto = require("crypto");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = require('../utils/sendEmails')
const ApiError = require("../utils/apiErrors");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

//@desc Login User
//@route POST /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compare(req.body.password, user.password)) {
    return next(new ApiError("Wronge credentials", 404));
  }
  const token = generateToken(user._id);
  res.status(200).json({ status: "Success", data: user, token });
});

//@desc Cheack tokens sent in request headers
//@route Middleware
//@access Public
exports.auth = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  }
  if (!token) {
    return next(
      new ApiError("UnAuthorized User, please login with valid Account", 401)
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(
      new ApiError("The user that belong to this token no longer exist")
    );
  }
  if (user.passwordChangedAt) {
    const passwordToTimeStamps = parseInt(user.passwordChangedAt / 1000, 10);
    if (passwordToTimeStamps > decoded.iat) {
      return next(
        new ApiError("User recentlly changed password please login again")
      );
    }
  }
  req.user = user;
  next();
});

// @desc Make routes secure for spesific role
// @route Middleware
// @access Public
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("This user is not allowed to access this route", 401)
      );
    }
    next();
  });

// @desc Get Logged user data
// @route Middleware
// @access Public
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({ status: "Success", data: user });
});

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  // 1) Find user by email 
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ApiError("This email is not registerd", 404));
  // 2) Generate 6 numbers reset code
  const resetCode = Math.floor(1000 + Math.random() * 900000).toString();
  // 3) Hash Reset Code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // 4) Save them to DB
    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpirs = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;
    await user.save()
  
    const message = `Hi ${user.name}, \nWe have recived a request to change the password on your Student account. \n ${resetCode}`;

    // 5) send the reset code via email
    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Code (Valid for 10 mins)",
        message,
      });
    } catch (error) {
      user.passwordResetCode = undefined;
      user.passwordResetExpirs = undefined;
      user.passwordResetVerified = undefined;
  
      await user.save();
      return next(new ApiError("There was an Error sending this email", 500));
    }
  
    res
      .status(200)
      .json({ status: "success", message: "Rest code sent to email" });
});
