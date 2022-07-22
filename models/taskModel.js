const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    points: Number,
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

// create virtuals to access the answers from users

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
