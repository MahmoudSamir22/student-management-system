const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const Schedule = require("../models/scheduleModel");

exports.getMySchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.find({
    classLevel: req.user.studentLevel,
    section: req.user.section,
  });
  if(!schedule) {
    return next(new ApiError('Schedule not up yet', 404))
  }
  res.status(200).json({status: 'Success', data: schedule})
});
