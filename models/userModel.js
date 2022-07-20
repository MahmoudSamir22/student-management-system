const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "student",
    },
    courses: [{ type: mongoose.Schema.ObjectId, ref: "Course" }],
    avatar: String,
    phone: String,
    passwordChangedAt: Date,
    studentLevel: Number,
    section: Number,
  },
  { timestamps: true }
);

userSchema.pre(/^find/, function (next) {
  this.populate({ path: "courses", select: "name instructor" });
  next()
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
