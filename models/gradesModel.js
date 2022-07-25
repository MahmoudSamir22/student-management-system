const mongoose = require("mongoose");

const gradesSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
    student: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    points: Number,
  },
  { timestamps: true }
);

gradesSchema.pre(/^find/, function (next) {
  this.populate({ path: "course", select: "name fullMarks instructor" });
  this.populate({ path: "student", select: "name studentLevel section" });
  next();
});

const Grades = mongoose.model("Grades", gradesSchema);

module.exports = Grades;
