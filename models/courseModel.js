const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
  assignments: String,
  content: String,
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
