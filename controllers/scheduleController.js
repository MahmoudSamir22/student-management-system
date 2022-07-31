const factory = require('./factoryHandler')
const Schedule = require("../models/scheduleModel");

// @desc Add Course to Schedule
// @route POST /api/v1/schudle
// @access Private/Admin
exports.addSchedule = factory.createOne(Schedule)
// @desc Get Schedule
// @route GET /api/v1/schedule
// @access Private/Admin
exports.getSchedules = factory.getAll(Schedule)

// @desc Get Spesific Schedule
// @route GET /api/v1/schedule/id
// @access Public
exports.getSchedule = factory.getOne(Schedule)

// @desc Update Spesific schedule
// @route PUT /api/v1/schedule/id
// @access Private/Admin
exports.updateSchedule = factory.updateOne(Schedule)

// @desc Delete Spesific schedule
// @route DELETE /api/v1/schedule/id
// @access Private/Admin
exports.deleteSchedule = factory.deleteOne(Schedule)