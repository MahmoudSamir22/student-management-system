const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course Name is required"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    duration: Number,
    assignments: String,
    content: String,
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
