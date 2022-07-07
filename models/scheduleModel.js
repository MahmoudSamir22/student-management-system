const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    classLevel: {
      type: Number,
      required: [true, "Class level is required"],
    },
    section: {
      type: Number,
      required: [true, "Section is required"],
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "course",
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    day: {
      type: Date,
      required: [true, "Day is required"],
    },
    start: Date,
    end: Date,
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
