const mongoose = require("mongoose");

const courseModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: mongoose.ObjectId, ref: "Course", required: true },
    description: { type: String },
    lessons: [{ type: mongoose.ObjectId, ref: "Lesson", default: [] }],
  },
  { timestamps: true }
);

const CourseModule = mongoose.model("CourseModule", courseModuleSchema);

module.exports = { CourseModule };
