const fs = require("fs");

const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadSingleImage } = require("../middlewares/uploadFilesMiddleWare");
const generateToken = require("../utils/generateToken");
const factory = require("./factoryHandler");
const ApiError = require("../utils/apiErrors");
const User = require("../models/userModel");

// @desc Middleware to handle image uploads
// @route Middleware
// @access Private/Instructor
exports.uploadUserAvatar = uploadSingleImage("avatar");

exports.resizeUserAvatar = asyncHandler(async (req, res, next) => {
  if (req.file) {
    if (!fs.existsSync("./uploads/users")) {
      if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads");
      }
      fs.mkdirSync("./uploads/users");
    }
    const fileName = `avatar-${uuidv4()}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${fileName}`);

    req.body.avatar = fileName;
  }
  next();
});

//@desc Create new user
//@route POST /api/v1/users/
//@access Public
exports.createUser = factory.createOne(User);

//@desc Get all users
//@route GET /api/v1/users/
//@access Private
exports.getUsers = factory.getAll(User);

//@desc Get spesific user
//@route GET /api/v1/users/:id
//@access Public
exports.getUser = factory.getOne(User);

//@desc Delete spesific user
//@route DELETE /api/v1/users/:id
//@access Public
exports.deleteUser = factory.deleteOne(User);

//@desc Update spesific user
//@route PUT /api/v1/users/:id
//@access Private/User
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return next(
      new ApiError(`There is no user with this id ${req.params.id}`, 404)
    );
  }
  await user.save();
  res.status(200).json({ data: user });
});

exports.changeMyPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const isEqual = await bcrypt.compare(oldPassword, req.user.password);
  if (!isEqual) {
    return next(
      new ApiError("Password mismatch please enter the correct password", 400)
    );
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { password: await bcrypt.hash(newPassword) },
    { new: true }
  );
  const token = generateToken(req.user._id);
  res.status(200).json({ status: "success", data: user, token });
});


