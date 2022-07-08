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
      ref: "Course",
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    day: {
      type: String,
      required: [true, "Day is required"],
      enum: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    start: Number,
    end: Number,
  },
  { timestamps: true }
);

scheduleSchema.pre(/^find/, function (next) {
  this.populate({ path: "course", select: "name instructor -_id" });
  next();
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
