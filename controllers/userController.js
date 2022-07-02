const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const User = require("../models/userModel");

//@desc Create new user
//@route POST /api/v1/users/
//@access Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ status: "Success", data: user });
});

//@desc Get all users
//@route GET /api/v1/users/
//@access Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res
    .status(200)
    .json({ status: "Success", result: users.length, data: users });
});

//@desc Get spesific user
//@route GET /api/v1/users/:id
//@access Public
exports.getUser = aexports.getUsers = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ApiError('User not found', 404))
    }
    res
      .status(200)
      .json({ status: "Success", data: user });
  });