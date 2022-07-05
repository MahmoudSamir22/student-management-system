const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const passwordToTimeStamps = parseInt(
      user.passwordChangedAt / 1000,
      10
    );
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
