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
    avatar: String,
    phone: String,
    passwordChangedAt: Date,
    studentLevel: Number,
    section: Number,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
