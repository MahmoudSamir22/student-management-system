const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    description: String,
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

// populate course and instructor information
taskSchema.pre(/^find/, function(next){
  this.populate({path: "course", select: 'name'})
  this.populate({path: "instructor", select: 'name -courses'})
  next()
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
