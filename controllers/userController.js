const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const User = require("../models/userModel");

//@desc Create new user
//@route POST /api/v1/users/
//@access Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  await user.save()
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
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ApiError('User not found', 404))
    }
    res
      .status(200)
      .json({ status: "Success", data: user });
  });


//@desc Delete spesific user
//@route DELETE /api/v1/users/:id
//@access Public
exports.deleteUser = asyncHandler(async (req, res ,next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if(!user){
    return next(new ApiError(`There is no user with this id ${req.params.id}`, 404));
  }
  res.status(204).json()
})


//@desc Update spesific user
//@route PUT /api/v1/users/:id
//@access Public
exports.updateUser =  asyncHandler(async (req, res ,next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
  if(!user){
    return next(new ApiError(`There is no user with this id ${req.params.id}`, 404));
  }
  await user.save()
  res.status(200).json({data: user})
})