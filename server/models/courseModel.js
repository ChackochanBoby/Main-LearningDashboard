const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: { type: mongoose.ObjectId, ref: "Admin", required: true },
    description: { type: String },
    modules: [{ type: mongoose.ObjectId, ref: "CourseModule", default: [] }],
    price: { type: String, default: "0", required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };
