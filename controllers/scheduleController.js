const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Schedule = require("../models/scheduleModel");

// @desc Add Course to Schedule
// @route POST /api/v1/schudle
// @access Private/Admin
exports.addSchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.create(req.body);
  await schedule.save();
  res.status(201).json({ status: "Success", data: schedule });
});

// @desc Get Schedule
// @route GET /api/v1/schedule
// @access Private/Admin
exports.getSchedules = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.find();
  res
    .status(201)
    .json({ status: "Success", result: schedule.length, data: schedule });
});

// @desc Get Spesific Schedule
// @route GET /api/v1/schedule/id
// @access Public
exports.getSchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) {
    return next(
      new ApiError(`Can't find schedule with this id: ${req.params.id}`)
    );
  }
  res.status(200).json({ status: "Success", data: schedule });
});

// @desc Update Spesific schedule
// @route PUT /api/v1/schedule/id
// @access Private/Admin
exports.updateSchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!schedule) {
    return next(
      new ApiError(`Can't find schedule with this id: ${req.params.id}`)
    );
  }
  res.status(200).json({ status: "Success", data: schedule });
});

// @desc Delete Spesific schedule
// @route DELETE /api/v1/schedule/id
// @access Private/Admin
exports.deleteSchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.findByIdAndDelete(req.params.id);
  if (!schedule) {
    return next(
      new ApiError(`Can't find schedule with this id: ${req.params.id}`)
    );
  }
  res.status(204).json();
});
