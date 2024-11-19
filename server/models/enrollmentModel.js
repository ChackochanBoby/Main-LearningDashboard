const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.ObjectId, ref: "Course", required: true },
    learner: { type: mongoose.ObjectId, ref: "User", required: true },
    progress: { type: mongoose.ObjectId, ref: "Progress", default: null },
    status: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "incomplete",
      required: true,
    },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = {Enrollment };
